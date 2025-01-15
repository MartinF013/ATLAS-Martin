import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/atlasqueretaro/" // prod
      : "/", // dev
  build: {
    chunkSizeWarningLimit: 2000,
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

      //views
      "@views/Home": path.resolve(__dirname, "./src/views/Home.vue"),
      "@views/Map": path.resolve(__dirname, "./src/views/Map.vue"),

      //Widget Components
      "@components/widget/BufferWidget": path.resolve(
        __dirname,
        "./src/components/widget/BufferWidget.vue"
      ),      
      "@components/widget/ElevationProfileWidget": path.resolve(
        __dirname,
        "./src/components/widget/ElevationProfile/ElevationProfileWidget.vue"
      ),
      "@components/widget/ERGWidget": path.resolve(
        __dirname,
        "./src/components/widget/ERGWidget/ERGWidget.vue"
      ),
      "@components/widget/ExposedSystemsWidget": path.resolve(
        __dirname,
        "./src/components/widget/ExposedSystemsWidget.vue"
      ),
      "@components/widget/KmlWidget": path.resolve(
        __dirname,
        "./src/components/widget/KmlWidget.vue"
      ),
      "@components/widget/StoryMapWidget": path.resolve(
        __dirname,
        "./src/components/widget/StoryMapWidget.vue"
      ),
      "@components/widget/TableKml": path.resolve(
        __dirname,
        "./src/components/widget/TableKml.vue"
      ),
      "@components/widget/MeasurementWidget": path.resolve(
        __dirname,
        "./src/components/widget/MeasurementWidget.vue"
      ),

      //Base Components
      "@components/base/Button": path.resolve(
        __dirname,
        "./src/components/base/Button.vue"
      ),
      "@components/base/ToggleButton": path.resolve(
        __dirname,
        "./src/components/base/ToggleButton.vue"
      ),      
      "@components/base/Input": path.resolve(
        __dirname,
        "./src/components/base/Input.vue"
      ),
      "@components/base/Message": path.resolve(
        __dirname,
        "./src/components/base/Message.vue"
      ),
      "@components/base/Select": path.resolve(
        __dirname,
        "./src/components/base/Select.vue"
      ),
      "@components/base/Title": path.resolve(
        __dirname,
        "./src/components/base/Title.vue"
      ),
      "@components/base/Tool": path.resolve(
        __dirname,
        "./src/components/base/Tool.vue"
      ),
      //Container Components
      "@components/container/Banner": path.resolve(
        __dirname,
        "./src/components/container/Banner.vue"
      ),
      "@components/container/Login": path.resolve(
        __dirname,
        "./src/components/container/Login.vue"
      ),
    },
  },
  plugins: [vue()],
});
