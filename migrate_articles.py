#!/usr/bin/env python3
"""
Script to migrate blog article frontmatter from old format to new format.

Changes:
1. published -> publishDate
2. Add language: 'Chinese'
3. cover -> heroImage (string to object format)
4. Remove author field
5. Move sourceLink to article body
6. Add description: '' if not present
"""

import os
import re
from pathlib import Path
from typing import Dict, Any, Optional

def parse_frontmatter(content: str) -> tuple[Optional[Dict[str, Any]], str, str]:
    """
    Parse frontmatter from markdown content.
    Returns: (frontmatter_dict, frontmatter_text, body)
    """
    # Match frontmatter between --- markers
    pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(pattern, content, re.DOTALL)

    if not match:
        return None, '', content

    frontmatter_text = match.group(1)
    body = match.group(2)

    # Parse frontmatter manually (simple YAML parsing)
    frontmatter = {}
    current_key = None
    current_list = []
    in_list = False

    for line in frontmatter_text.split('\n'):
        line = line.rstrip()

        # Skip empty lines
        if not line:
            continue

        # Check if it's a list item
        if line.startswith('  - ') or line.startswith('    - '):
            if in_list:
                current_list.append(line.strip('- ').strip())
            continue

        # Check if it's a key-value pair
        if ':' in line and not line.startswith(' '):
            # Save previous list if exists
            if in_list and current_key:
                frontmatter[current_key] = current_list
                in_list = False
                current_list = []

            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            # Check if this starts a list
            if not value:
                current_key = key
                in_list = True
                current_list = []
            else:
                frontmatter[key] = value
                current_key = key

    # Save last list if exists
    if in_list and current_key:
        frontmatter[current_key] = current_list

    return frontmatter, frontmatter_text, body


def migrate_frontmatter(frontmatter: Dict[str, Any]) -> tuple[Dict[str, Any], Optional[str]]:
    """
    Migrate frontmatter from old format to new format.
    Returns: (new_frontmatter, sourceLink_content)
    """
    new_fm = {}
    source_link = None

    for key, value in frontmatter.items():
        # 1. published -> publishDate
        if key == 'published':
            new_fm['publishDate'] = value
        # 3. cover -> heroImage (convert to object format)
        elif key == 'cover':
            # Extract filename from path
            if value:
                # Remove quotes if present
                cover_path = value.strip('\'"')
                new_fm['heroImage'] = f"{{ src: '{cover_path}', color: '#B8C5D6' }}"
        # 4. Remove author field (skip it)
        elif key == 'author':
            continue
        # 5. Save sourceLink for later
        elif key == 'sourceLink':
            source_link = value.strip('\'"')
        # Keep other fields
        else:
            new_fm[key] = value

    # 2. Add language: 'Chinese' if not present
    if 'language' not in new_fm:
        new_fm['language'] = "'Chinese'"

    # 6. Add description: '' if not present (required field)
    if 'description' not in new_fm:
        new_fm['description'] = "''"

    return new_fm, source_link


def generate_frontmatter_text(frontmatter: Dict[str, Any]) -> str:
    """
    Generate frontmatter text from dictionary.
    """
    lines = ['---']

    # Define field order
    field_order = [
        'title', 'publishDate', 'updatedDate', 'description',
        'tags', 'language', 'first_level_category', 'second_level_category',
        'heroImage', 'draft', 'comment'
    ]

    # Add fields in order
    for field in field_order:
        if field in frontmatter:
            value = frontmatter[field]

            # Handle lists (tags)
            if isinstance(value, list):
                lines.append(f'{field}:')
                for item in value:
                    lines.append(f'  - {item}')
            else:
                lines.append(f'{field}: {value}')

    # Add any remaining fields not in order
    for key, value in frontmatter.items():
        if key not in field_order:
            if isinstance(value, list):
                lines.append(f'{key}:')
                for item in value:
                    lines.append(f'  - {item}')
            else:
                lines.append(f'{key}: {value}')

    lines.append('---')
    return '\n'.join(lines)


def process_file(file_path: Path, dry_run: bool = False) -> bool:
    """
    Process a single markdown file.
    Returns True if file was modified, False otherwise.
    """
    try:
        # Read file content
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Parse frontmatter
        frontmatter, _, body = parse_frontmatter(content)

        if not frontmatter:
            print(f"  [!] No frontmatter found in {file_path}")
            return False

        # Check if migration is needed
        needs_migration = (
            'published' in frontmatter or
            'cover' in frontmatter or
            'author' in frontmatter or
            'sourceLink' in frontmatter or
            'language' not in frontmatter or
            'description' not in frontmatter
        )

        if not needs_migration:
            print(f"  [OK] Already migrated: {file_path.name}")
            return False

        # Migrate frontmatter
        new_frontmatter, source_link = migrate_frontmatter(frontmatter)

        # Generate new frontmatter text
        new_fm_text = generate_frontmatter_text(new_frontmatter)

        # Add sourceLink to body if present
        new_body = body
        if source_link:
            # Add source link at the beginning of the body
            source_text = f"\n> **Source**: [{source_link}]({source_link})\n\n"
            new_body = source_text + body

        # Combine new content
        new_content = new_fm_text + '\n\n' + new_body

        if dry_run:
            print(f"  [DRY] Would migrate: {file_path.name}")
            return True

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"  [DONE] Migrated: {file_path.name}")
        return True

    except Exception as e:
        print(f"  [ERROR] Error processing {file_path}: {e}")
        return False


def process_directory(directory: Path, dry_run: bool = False) -> tuple[int, int]:
    """
    Process all markdown files in a directory recursively.
    Returns: (total_files, migrated_files)
    """
    total_files = 0
    migrated_files = 0

    print(f"\n[DIR] Processing directory: {directory}")

    # Find all markdown files
    md_files = list(directory.rglob('*.md'))

    if not md_files:
        print("  [!] No markdown files found")
        return 0, 0

    print(f"  Found {len(md_files)} markdown files\n")

    for md_file in md_files:
        total_files += 1
        if process_file(md_file, dry_run):
            migrated_files += 1

    return total_files, migrated_files


def main():
    """Main function."""
    import sys

    # Default directory
    default_dir = Path(r'D:\Coding\Wrote_Codes\blogs')

    # Parse arguments
    dry_run = '--dry-run' in sys.argv or '-n' in sys.argv
    target_dir = default_dir

    if len(sys.argv) > 1 and not sys.argv[1].startswith('-'):
        target_dir = Path(sys.argv[1])

    if not target_dir.exists():
        print(f"[ERROR] Directory not found: {target_dir}")
        return 1

    print("=" * 60)
    print("Blog Article Migration Script")
    print("=" * 60)

    if dry_run:
        print("[DRY RUN] No files will be modified")

    # Process directory
    total, migrated = process_directory(target_dir, dry_run)

    # Summary
    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    print(f"  Total files processed: {total}")
    print(f"  Files migrated: {migrated}")
    print(f"  Files skipped: {total - migrated}")

    if dry_run:
        print("\n[INFO] Run without --dry-run to apply changes")

    return 0


if __name__ == '__main__':
    exit(main())


