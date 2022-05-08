const handleToDate = (dateImport: string) => {
  const date: Date = new Date(dateImport);
  const dateExport = `${date.getFullYear()}/${
    (date.getMonth() % 12) + 1
  }/${date.getDate()}`;

  return dateExport;
};

export default handleToDate;
