import readdirp, { EntryInfo } from "readdirp";
import { pathToFileURL } from "url";

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
  const files: Promise<IReturn<T>>[] = [];
  return new Promise((resolve) => {
    readdirp(`./src/${path}`, {
      fileFilter: ["*.ts"],
    })
      .on("data", (entry: EntryInfo) => {
        files.push(
          new Promise((resolveImport) => {
            void import(pathToFileURL(entry.fullPath).href).then((file) => {
              resolveImport({
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                data: file.default as T,
                path: entry.path,
              });
            });
          }),
        );
      })
      .on("end", () => {
        void Promise.all(files).then((data) => {
          resolve(data);
        });
      });
  });
};
