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
  const entries = await readdirp.promise(`./src/${path}`, {
    fileFilter: ["*.ts"],
  });
  const files = entries.map((entry) =>
    import(pathToFileURL(entry.fullPath).href).then((file: { default: T }) => ({
      data: file.default,
      path: entry.path,
    })),
  );
  return Promise.all(files);
};
