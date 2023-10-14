import * as esbuild from "esbuild"
const config = {
  entryPoints: ["implementers/**/*.ts", "utils/**/*.ts"],
  bundle: true,
  platform: "neutral",
  outdir: "lib",
  packages: "external",
}

if (process.env.ESB_WATCH === "true") {
  const ctx = await esbuild.context(config)
  await ctx.watch()
  console.log("Watching for changes...")
} else {
  await esbuild.build(config)
}
