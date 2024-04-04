// vite.config.ts
import {
  loadEnv
} from "file:///E:/Web/WebStorm/project/03-git-project/admin-init/node_modules/.pnpm/vite@5.0.11_@types+node@20.11.5_sass@1.70.0/node_modules/vite/dist/node/index.js";
import path, { resolve } from "path";
import vue
  from "file:///E:/Web/WebStorm/project/03-git-project/admin-init/node_modules/.pnpm/@vitejs+plugin-vue@5.0.3_vite@5.0.11_vue@3.4.15/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx
  from "file:///E:/Web/WebStorm/project/03-git-project/admin-init/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.11_vue@3.4.15/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import {
  createSvgIconsPlugin
} from "file:///E:/Web/WebStorm/project/03-git-project/admin-init/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.11/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader
  from "file:///E:/Web/WebStorm/project/03-git-project/admin-init/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.4.15/node_modules/vite-svg-loader/index.js";
import UnoCSS
  from "file:///E:/Web/WebStorm/project/03-git-project/admin-init/node_modules/.pnpm/unocss@0.58.3_postcss@8.4.33_vite@5.0.11/node_modules/unocss/dist/vite.mjs";

var __vite_injected_original_dirname = "E:\\Web\\WebStorm\\project\\03-git-project\\admin-init";
var vite_config_default = (configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        "/api/v1": {
          target: "https://www.fastmock.site/mock/761e2dda2b8890ab86c928a74e8f6538",
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true
        }
      },
      /** 预热常用文件，提高初始页面加载速度 */
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
            vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
          }
        }
      }
    },
    /** 混淆器 */
    esbuild: {
      /** 打包时移除 console.log */
      pure: ["console.log"],
      /** 打包时移除 debugger */
      drop: ["debugger"],
      /** 打包时移除所有注释 */
      legalComments: "none"
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS()
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom"
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXZWJcXFxcV2ViU3Rvcm1cXFxccHJvamVjdFxcXFwwMy1naXQtcHJvamVjdFxcXFxhZG1pbi1pbml0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxXZWJcXFxcV2ViU3Rvcm1cXFxccHJvamVjdFxcXFwwMy1naXQtcHJvamVjdFxcXFxhZG1pbi1pbml0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9XZWIvV2ViU3Rvcm0vcHJvamVjdC8wMy1naXQtcHJvamVjdC9hZG1pbi1pbml0L3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5cclxuaW1wb3J0IHsgdHlwZSBDb25maWdFbnYsIHR5cGUgVXNlckNvbmZpZ0V4cG9ydCwgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcclxuaW1wb3J0IHN2Z0xvYWRlciBmcm9tIFwidml0ZS1zdmctbG9hZGVyXCI7XHJcbmltcG9ydCBVbm9DU1MgZnJvbSBcInVub2Nzcy92aXRlXCI7XHJcblxyXG4vKiogXHU5MTREXHU3RjZFXHU5ODc5XHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZyAqL1xyXG5leHBvcnQgZGVmYXVsdCAoY29uZmlnRW52OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnRXhwb3J0ID0+IHtcclxuICBjb25zdCB2aXRlRW52ID0gbG9hZEVudihjb25maWdFbnYubW9kZSwgcHJvY2Vzcy5jd2QoKSkgYXMgSW1wb3J0TWV0YUVudjtcclxuICBjb25zdCB7IFZJVEVfUFVCTElDX1BBVEggfSA9IHZpdGVFbnY7XHJcbiAgcmV0dXJuIHtcclxuICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTY4MzlcdTYzNkVcdTVCOUVcdTk2NDVcdTYwQzVcdTUxQjVcdTRGRUVcdTY1MzkgYmFzZSAqL1xyXG4gICAgYmFzZTogVklURV9QVUJMSUNfUEFUSCxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAvKiogQCBcdTdCMjZcdTUzRjdcdTYzMDdcdTU0MTEgc3JjIFx1NzZFRVx1NUY1NSAqL1xyXG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIC8qKiBcdThCQkVcdTdGNkUgaG9zdDogdHJ1ZSBcdTYyNERcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjggTmV0d29yayBcdTc2ODRcdTVGNjJcdTVGMEZcdUZGMENcdTRFRTUgSVAgXHU4QkJGXHU5NUVFXHU5ODc5XHU3NkVFICovXHJcbiAgICAgIGhvc3Q6IHRydWUsIC8vIGhvc3Q6IFwiMC4wLjAuMFwiXHJcbiAgICAgIC8qKiBcdTdBRUZcdTUzRTNcdTUzRjcgKi9cclxuICAgICAgcG9ydDogMzMzMyxcclxuICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OCAqL1xyXG4gICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgLyoqIFx1OERFOFx1NTdERlx1OEJCRVx1N0Y2RVx1NTE0MVx1OEJCOCAqL1xyXG4gICAgICBjb3JzOiB0cnVlLFxyXG4gICAgICAvKiogXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU2NUY2XHVGRjBDXHU2NjJGXHU1NDI2XHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBICovXHJcbiAgICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxyXG4gICAgICAvKiogXHU2M0E1XHU1M0UzXHU0RUUzXHU3NDA2ICovXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgXCIvYXBpL3YxXCI6IHtcclxuICAgICAgICAgIHRhcmdldDogXCJodHRwczovL3d3dy5mYXN0bW9jay5zaXRlL21vY2svNzYxZTJkZGEyYjg4OTBhYjg2YzkyOGE3NGU4ZjY1MzhcIixcclxuICAgICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1NTE0MVx1OEJCOFx1OERFOFx1NTdERiAqL1xyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAvKiogXHU5ODg0XHU3MEVEXHU1RTM4XHU3NTI4XHU2NTg3XHU0RUY2XHVGRjBDXHU2M0QwXHU5QUQ4XHU1MjFEXHU1OUNCXHU5ODc1XHU5NzYyXHU1MkEwXHU4RjdEXHU5MDFGXHU1RUE2ICovXHJcbiAgICAgIHdhcm11cDoge1xyXG4gICAgICAgIGNsaWVudEZpbGVzOiBbXCIuL3NyYy9sYXlvdXRzLyoqLyoudnVlXCJdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvKiogXHU1MzU1XHU0RTJBIGNodW5rIFx1NjU4N1x1NEVGNlx1NzY4NFx1NTkyN1x1NUMwRlx1OEQ4NVx1OEZDNyAyMDQ4S0IgXHU2NUY2XHU1M0QxXHU1MUZBXHU4QjY2XHU1NDRBICovXHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjA0OCxcclxuICAgICAgLyoqIFx1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QSAqL1xyXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTU0MEVcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTc2RUVcdTVGNTUgKi9cclxuICAgICAgYXNzZXRzRGlyOiBcInN0YXRpY1wiLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFx1NTIwNlx1NTc1N1x1N0I1Nlx1NzU2NVxyXG4gICAgICAgICAgICogMS4gXHU2Q0U4XHU2MTBGXHU4RkQ5XHU0RTlCXHU1MzA1XHU1NDBEXHU1RkM1XHU5ODdCXHU1QjU4XHU1NzI4XHVGRjBDXHU1NDI2XHU1MjE5XHU2MjUzXHU1MzA1XHU0RjFBXHU2MkE1XHU5NTE5XHJcbiAgICAgICAgICAgKiAyLiBcdTU5ODJcdTY3OUNcdTRGNjBcdTRFMERcdTYwRjNcdTgxRUFcdTVCOUFcdTRFNDkgY2h1bmsgXHU1MjA2XHU1MjcyXHU3QjU2XHU3NTY1XHVGRjBDXHU1M0VGXHU0RUU1XHU3NkY0XHU2M0E1XHU3OUZCXHU5NjY0XHU4RkQ5XHU2QkI1XHU5MTREXHU3RjZFXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgICB2dWU6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJwaW5pYVwiXSxcclxuICAgICAgICAgICAgZWxlbWVudDogW1wiZWxlbWVudC1wbHVzXCIsIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIl0sXHJcbiAgICAgICAgICAgIHZ4ZTogW1widnhlLXRhYmxlXCIsIFwidnhlLXRhYmxlLXBsdWdpbi1lbGVtZW50XCIsIFwieGUtdXRpbHNcIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKiogXHU2REY3XHU2REM2XHU1NjY4ICovXHJcbiAgICBlc2J1aWxkOiB7XHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjQgY29uc29sZS5sb2cgKi9cclxuICAgICAgcHVyZTogW1wiY29uc29sZS5sb2dcIl0sXHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjQgZGVidWdnZXIgKi9cclxuICAgICAgZHJvcDogW1wiZGVidWdnZXJcIl0sXHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjRcdTYyNDBcdTY3MDlcdTZDRThcdTkxQ0EgKi9cclxuICAgICAgbGVnYWxDb21tZW50czogXCJub25lXCJcclxuICAgIH0sXHJcbiAgICAvKiogVml0ZSBcdTYzRDJcdTRFRjYgKi9cclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICAvKiogXHU1QzA2IFNWRyBcdTk3NTlcdTYwMDFcdTU2RkVcdThGNkNcdTUzMTZcdTRFM0EgVnVlIFx1N0VDNFx1NEVGNiAqL1xyXG4gICAgICBzdmdMb2FkZXIoeyBkZWZhdWx0SW1wb3J0OiBcInVybFwiIH0pLFxyXG4gICAgICAvKiogU1ZHICovXHJcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9pY29ucy9zdmdcIildLFxyXG4gICAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCJcclxuICAgICAgfSksXHJcbiAgICAgIC8qKiBVbm9DU1MgKi9cclxuICAgICAgVW5vQ1NTKClcclxuICAgIF0sXHJcbiAgICAvKiogVml0ZXN0IFx1NTM1NVx1NTE0M1x1NkQ0Qlx1OEJENVx1OTE0RFx1N0Y2RVx1RkYxQWh0dHBzOi8vY24udml0ZXN0LmRldi9jb25maWcgKi9cclxuICAgIHRlc3Q6IHtcclxuICAgICAgaW5jbHVkZTogW1widGVzdHMvKiovKi50ZXN0LnRzXCJdLFxyXG4gICAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiXHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBZ0QsZUFBZTtBQUMvRCxPQUFPLFFBQVEsZUFBZTtBQUM5QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZUFBZTtBQUN0QixPQUFPLFlBQVk7QUFSbkIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxDQUFDLGNBQTJDO0FBQ3pELFFBQU0sVUFBVSxRQUFRLFVBQVUsTUFBTSxRQUFRLElBQUksQ0FBQztBQUNyRCxRQUFNLEVBQUUsaUJBQWlCLElBQUk7QUFDN0IsU0FBTztBQUFBO0FBQUEsSUFFTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUE7QUFBQSxRQUVMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixZQUFZO0FBQUE7QUFBQSxNQUVaLE9BQU87QUFBQSxRQUNMLFdBQVc7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLElBQUk7QUFBQTtBQUFBLFVBRUosY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsd0JBQXdCO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLHVCQUF1QjtBQUFBO0FBQUEsTUFFdkIsc0JBQXNCO0FBQUE7QUFBQSxNQUV0QixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTU4sY0FBYztBQUFBLFlBQ1osS0FBSyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUEsWUFDbEMsU0FBUyxDQUFDLGdCQUFnQix5QkFBeUI7QUFBQSxZQUNuRCxLQUFLLENBQUMsYUFBYSw0QkFBNEIsVUFBVTtBQUFBLFVBQzNEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFNBQVM7QUFBQTtBQUFBLE1BRVAsTUFBTSxDQUFDLGFBQWE7QUFBQTtBQUFBLE1BRXBCLE1BQU0sQ0FBQyxVQUFVO0FBQUE7QUFBQSxNQUVqQixlQUFlO0FBQUEsSUFDakI7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBO0FBQUEsTUFFUCxVQUFVLEVBQUUsZUFBZSxNQUFNLENBQUM7QUFBQTtBQUFBLE1BRWxDLHFCQUFxQjtBQUFBLFFBQ25CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsZUFBZSxDQUFDO0FBQUEsUUFDdkQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBO0FBQUEsTUFFRCxPQUFPO0FBQUEsSUFDVDtBQUFBO0FBQUEsSUFFQSxNQUFNO0FBQUEsTUFDSixTQUFTLENBQUMsb0JBQW9CO0FBQUEsTUFDOUIsYUFBYTtBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
