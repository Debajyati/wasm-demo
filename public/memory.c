#include <stdlib.h>
#include <emscripten.h>

extern EMSCRIPTEN_KEEPALIVE void* my_malloc(size_t size) {
  return malloc(size);
}

extern EMSCRIPTEN_KEEPALIVE void my_free(void* ptr) {
  free(ptr);
}
