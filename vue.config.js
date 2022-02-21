module.exports = {
    css: {
      loaderOptions: {
        sass: {
          additionalData: `@import "~@/variables.sass"`

        },
        scss: {
          additionalData: `@import "~@/variables.scss"`
        }
      }
    }
  };