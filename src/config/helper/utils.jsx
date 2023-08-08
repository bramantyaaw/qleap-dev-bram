/**
 * Functions in utils
 */

/**
 * Add commas to a number
 * v1.0.0
 */
export const numberWithCommas = (x, decimal = 0) => {
  return x.toLocaleString("en-US", { minimumFractionDigits: decimal });
};

/**
 * Get the file extension from given file name
 * v1.2.0
 */
export const getFileExtension = (filename) => {
  const extension = filename.split(".").pop();
  return extension;
};

/**
 * Get the random number between min and max value
 * v1.2.0
 */
export const getRandomNo = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get the color name/value based on given status
 * v1.2.0
 */
export const getStatusColor = (itemstatus) => {
  let color = "";
  switch (itemstatus) {
    case "Medium":
      color = "warning";
      break;
    case "Low":
      color = "success";
      break;
    case "High":
      color = "danger";
      break;
    default:
      color = "primary";
  }
  return color;
};

/**
 * Get the color name/value based on given status
 * v1.2.0
 */
export const getCategoryColor = (category) => {
  let color = "";
  switch (category) {
    case "Saas Services":
    case "Entertainment":
    case "Extra":
      color = "info";
      break;
    case "Design":
      color = "warning";
      break;
    case "Marketing":
      color = "success";
      break;
    case "Development":
      color = "danger";
      break;
    case "SEO":
      color = "primary";
      break;
    default:
      color = "primary";
  }
  return color;
};

//get chunk from array
export const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

export const getDayValue = (date) => {
  let day = new Date(date).toLocaleString("en-us", { weekday: "long" });
  if (date === "") {
    return "-";
  } else {
    return day;
  }
};

// function to get time value in hh:mm AM | PM format
export const getTimeValue = (date) => {
  var hours = new Date(date).getHours();
  var minutes = new Date(date).getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " ";

  if (date === "") {
    return "-";
  } else {
    return strTime;
  }
};

// function to get date value in Month Name DD, YYYY format
export const getDateValue = (date) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const yyyy = new Date(date).getFullYear();
  let mm = new Date(date).getMonth();
  let dd = new Date(date).getDate();
  var today = month[mm] + " " + dd + ", " + yyyy;
  if (date === "") {
    return " ";
  } else {
    return today;
  }
};

export const timeStamp = (time) => {
  const date = new Date(time);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return formattedDate;
};

export const getMonthValue = (date) => {
  let day = new Date(date).toLocaleString("default", { month: "long" });

  return day;
};

export const getEffectiveDate = (dateStr) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const statusAttendance = (item) => {
  let color = "";
  switch (item) {
    case "Present":
      color = "success";
      break;
    case "Absent":
      color = "primary";
      break;
    default:
      color = "warning";
  }
  return color;
};

export const addCommas = (num) => {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};

export const removeNonNumeric = (num) => {
  return num ? num.toString().replace(/[^0-9]/g, "") : "";
};

export const countedAsWords = (value) => {
  var a = [
    "",
    "Satu ",
    "Dua ",
    "Tiga ",
    "Empat ",
    "Lima ",
    "Enam ",
    "Tujuh ",
    "Delapan ",
    "Sembilan ",
    "Sepuluh ",
    "Sebelas ",
    "Dua Belas ",
    "Tiga Belas ",
    "Empat Belas ",
    "Lima Belas ",
    "Enam Belas ",
    "Tujuh Belas ",
    "Delapan Belas ",
    "Sembilan Belas ",
  ];
  var b = [
    "",
    "",
    "Dua Puluh",
    "Tiga Puluh",
    "Empat Puluh",
    "Lima Puluh",
    "Enam Puluh",
    "Tujuh Puluh",
    "Delapan Puluh",
    "Sembilan Puluh",
  ];

  if ((value = value.toString()).length > 14) return "overflow";
  let n = ("00000000000" + removeNonNumeric(value))
    .substr(-11)
    .match(/^(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Miliar "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) +
        (n[3] != 0 ? "Ratus " : "Ratus Juta ")
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Juta "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) +
        (n[5] != 0 ? "Ratus " : "Ratus Ribu ")
      : "";
  str +=
    n[5] != 0
      ? (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + "Ribu "
      : "";
  str +=
    n[6] != 0
      ? (a[Number(n[6])] || b[n[6][0]] + " " + a[n[6][1]]) + "Ratus "
      : "";
  str +=
    n[7] != 0
      ? //(str != "" ? "and " : "") +
        a[Number(n[7])] || b[n[7][0]] + " " + a[n[7][1]]
      : //+ "only "
        "";
  str = str.replace(/Satu Ratus/g, "Seratus");
  str = str.replace(/Satu Ribu/g, "Seribu");
  return str;
};
export const getScoreColor = (item) => {
  let color = "";
  switch (item) {
    case "Failed":
      color = "danger";
      break;
    case "Achieved":
      color = "warning";
      break;
    case "Exceed":
      color = "success";
      break;
    default:
      color = "primary";
  }
  return color;
};

export const getDateValueEng = (date) => {
  const dateString = date;
  const newDate = new Date(dateString);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const yyyy = new Date(date).getFullYear();
  let mm = new Date(date).getMonth();
  let dd = new Date(date).getDate();
  var today = dd + " " + month[mm] + " " + yyyy;
  return today;
};

export const getDateValueInd = (date) => {
  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let dateInd = "";

  switch (getDayValue(date)) {
    case "Monday":
      dateInd = "Senin";
      break;
    case "Tuesday":
      dateInd = "Selasa";
      break;
    case "Wednesday":
      dateInd = "Rabu";
      break;
    case "Thursday":
      dateInd = "Kamis";
      break;
    case "Friday":
      dateInd = "Jumat";
      break;
    case "Saturday":
      dateInd = "Sabtu";
      break;
    case "Sunday":
      dateInd = "Minggu";
      break;
  }

  const yyyy = new Date(date).getFullYear();
  let mm = new Date(date).getMonth();
  let dd = new Date(date).getDate();
  var today = dateInd + ", " + dd + " " + month[mm] + " " + yyyy;
  if (date === "") {
    return " ";
  } else {
    return today;
  }
};

export const romanize = (num) => {
  if (isNaN(num)) return num;
  let digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};

export const monthDiff = (date1, date2) => {
  let d2 = new Date(date2);
  let d1 = new Date(date1);
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export const engDateFormat = (date) => {
  return (
    date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2]
  );
};

export const cutString = (text, count) => {
  return text && text?.slice(0, count) + (text.length > count ? "..." : "");
};

export const formatDateTime = (inputDate) => {
  if (!inputDate) {
    return ""; // Return an empty string if inputDate is null or undefined
  }

  const [datePart, timePart] = inputDate.split(", ");

  const [day, month, year] = datePart.split("/");

  // Reformat the date to 'YYYY-MM-DD' format
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;

  // Combine the formatted date and timePart to get the final result
  const parsedDateTime = `${formattedDate} ${timePart}`;

  return parsedDateTime;
};

const utils = [
  numberWithCommas,
  getFileExtension,
  getRandomNo,
  getStatusColor,
  chunk,
  getTimeValue,
  getDateValue,
  getDayValue,
  getMonthValue,
  statusAttendance,
  addCommas,
  removeNonNumeric,
  countedAsWords,
  getScoreColor,
  timeStamp,
  getDateValueInd,
  getDateValueEng,
  getEffectiveDate,
  monthDiff,
  romanize,
  engDateFormat,
  cutString,
  formatDateTime,
];

export default utils;
