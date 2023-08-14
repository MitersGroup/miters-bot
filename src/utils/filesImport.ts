import readdirp, { EntryInfo } from "readdirp";

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
            void import(entry.fullPath).then((file) => {
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
