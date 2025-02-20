#!/bin/bash

run ()
{
  if [[ "$1" = "erm" ]]; then
    emcc ./public/memory.c \
      -s EXPORTED_FUNCTIONS='[_my_malloc, _my_free]' \
      -s EXPORTED_RUNTIME_METHODS='ccall,cwrap' \
      -o ./public/mem.js -Oz
  elif [[ "$1" = "mod" ]]; then
    emcc ./public/memory.c \
      -s EXPORTED_FUNCTIONS='[_my_malloc, _my_free]' \
      -s EXPORTED_RUNTIME_METHODS='ccall,cwrap' \
      -s ENVIRONMENT='node' \
      -s MODULARIZE=1 \
      -o ./public/memory.js -Oz
  else
    emcc ./public/memory.c \
      -s EXPORTED_FUNCTIONS='[_my_malloc, _my_free]' \
      -o ./public/mem.js -Oz
  fi
}

run "$@"
