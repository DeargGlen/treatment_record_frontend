const handleToDateAndYobi = (dateImport: string) => {
  const date: Date = new Date(dateImport);
  const dateExport = `${date.getFullYear()}/${
    (date.getMonth() % 12) + 1
  }/${date.getDate()}(${
    ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
  })`;

  return dateExport;
};

export default handleToDateAndYobi;
