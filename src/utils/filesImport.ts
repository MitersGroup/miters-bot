import { pathToFileURL } from "url";
import readdirp from "readdirp";

interface IImportFiles {
  path: string;
}

interface IReturn<T> {
  data: T;
  path: string;
}

export const importFiles = async <T>({
  path,
}: IImportFiles): Promise<IReturn<T>[]> => {
  const inProduction = process.env["NODE_ENV"] === "production";
  const dirRoot = inProduction ? "dist" : "src";
  const fileFilter = inProduction ? "*.js" : "*.ts";

  const entries = await readdirp.promise(`./${dirRoot}/${path}`, {
    fileFilter: [fileFilter],
  });
  const files = entries.map(async (entry) =>
    import(pathToFileURL(entry.fullPath).href).then((file: { default: T }) => ({
      data: file.default,
      path: entry.path,
    })),
  );
  return Promise.all(files);
};
