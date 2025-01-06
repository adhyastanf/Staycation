import dayjs from "dayjs";

export function thousandSeparator(value, isCurrency = false) {
    const currencyFormat = {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    };
    const nf = new Intl.NumberFormat('id-ID', isCurrency && currencyFormat);
    return value && !isNaN(value) && nf.format(value);
  }
  
export function formatDate(date, format){
  return dayjs(date).format(format);
};