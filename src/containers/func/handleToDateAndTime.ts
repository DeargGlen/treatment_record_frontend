const handleToDateAndTime = (dateImport: string) => {
  const date: Date = new Date(dateImport);
  if (date.getMinutes() < 10) {
    const dateExport = `${date.getFullYear()}/${
      (date.getMonth() % 12) + 1
    }/${date.getDate()}(${
      ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
    }) ${date.getHours()}:0${date.getMinutes()}`;

    return dateExport;
  }
  const dateExport = `${date.getFullYear()}/${
    (date.getMonth() % 12) + 1
  }/${date.getDate()}(${
    ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
  }) ${date.getHours()}:${date.getMinutes()}`;

  return dateExport;
};

export default handleToDateAndTime;
