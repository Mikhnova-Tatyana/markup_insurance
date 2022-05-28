import webpack from "webpack-stream";
import typescript from "gulp-typescript";
const tsProject = typescript.createProject("tsconfig.json");

export const ts = () => {
  return app.gulp.src(app.path.src.ts, { sourcemaps: true })

    .pipe(tsProject())
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(webpack({
      mode: 'development',
      entry: './src/ts/main.ts',
      output: {
        filename: 'main.min.js',
      }, 
      resolve: {
        extensions: [ '.tsx', '.ts', '.js', ".css" ],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: ['ts-loader'],
            exclude: /node_modules/,
          },
          {
            test: /\.css$/i,
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream())
}




