#!/bin/bash
git config --global url."https://x-access-token:${GH_TOKEN}@github.com/".insteadOf "https://github.com/"
git lfs install
git submodule sync
git submodule update --init --recursive --force --remote
git submodule foreach git lfs pull
pnpm install
