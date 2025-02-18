import esbuild from 'esbuild';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const formats = ['esm', 'cjs'];

async function build() {
  try {
    for (const format of formats) {
      await esbuild.build({
        entryPoints: [path.resolve(__dirname, 'src/index.ts')],
        outdir: path.resolve(__dirname, `dist/${format}`),
        bundle: true,
        platform: 'node',
        target: 'es2022',
        sourcemap: true,
        format,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        define: {
          'process.env.NODE_ENV': format === 'esm' ? '"development"' : '"production"',
        },
      });
    }
    console.log('✅ Build successful (ESM + CJS)');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
