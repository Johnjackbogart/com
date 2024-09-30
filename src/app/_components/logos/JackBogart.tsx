import * as React from "react";
import type { SVGProps } from "react";

interface headerFill {
  foreground: string;
  background: string;
}

interface headerProps extends SVGProps<SVGSVGElement> {
  theme: string | undefined;
}

const darkFill: headerFill = { foreground: "#fff", background: "#000" };
const lightFill: headerFill = { foreground: "#000", background: "#fff" };

const JackBogart = (props: headerProps) => {
  // this will handle case where theme is undefined, useTheme may return undefined
  const fill: headerFill = props.theme === "dark" ? darkFill : lightFill;

  return (
    <svg
      width="330"
      height="160"
      version="1.1"
      viewBox="0 0 846.67 423.33"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={fill.background} strokeWidth="10">
        <path d="m185.58-2.4174c0.49393 17.501 0.27683 35.016 0.61216 52.52 0.26699 13.936 0.83911 27.865 1.0608 41.802 0.6139 38.591 0.35721 61.58 0.23802 100.27-0.26117 38.5-1.0986 76.993-2.352 115.47-0.26112 8.0159-1.0242 28.908-1.4898 38.317-0.17557 3.5479-0.42442 7.091-0.63663 10.637-0.27873 2.1376 0.2873 4.6373-0.83621 6.4128-0.53238 0.84133-3.6009-0.51729-2.7059-0.81513 5.6763-1.8887 13.684 0.97774 17.405-4.0759 2.3576-3.2014-5.2752-5.8602-8.0197-8.6687-12.888-13.189-10.255-10.252-25.574-22.241-5.6752-3.4515-11.202-7.2137-17.026-10.355-17.574-9.4772-36.374-16.252-55.618-20.232-13.534-2.7993-19.369-2.8601-32.673-3.8869-10.777-0.0186-21.557-0.2802-32.332-0.0555-8.7216 0.18186-19.832 1.8693-26.702 8.4814-0.93843 0.90327-1.65 2.0544-2.475 3.0816-1.2523 2.5456-2.2735 3.4326-1.5011 6.5098 0.28756 1.1456 0.53125 2.9667 1.6108 3.0981 9.1076 1.108 18.407 1.7839 27.489 0.44224 4.6523-0.68732 19.275-16.19 20.394-17.275 5.2046-6.0106 10.39-12.041 15.614-18.032 6.9144-7.9298 13.638-16.067 20.8-23.73 19.016-20.344 37.7-38.383 59.178-55.722 30.292-24.453 38.889-28.388 71.278-48.436 28.383-15.68 57.642-29.773 88.269-39.368 10.927-3.4234 23.219-6.3919 34.693-7.2765 3.5973-0.27734 7.2119 0.104 10.818 0.15601-20.672 1.8252-16.328-0.83826-9.4273 3.1777 2.2147 1.2888 4.1531 3.407 4.9721 6.0323 0.14584 0.46749 0.17595 0.96898 0.26395 1.4534l22.859-0.51026c-0.35236-1.8083-0.39129-2.6315-1.3074-4.3346-7.1624-13.315-28.503-8.8741-37.977-9.374-3.3065 0.103-6.6313-0.0841-9.9196 0.30902-10.742 1.2843-22.092 4.4569-32.276 8.0025-29.406 10.238-57.455 24.584-84.778 40.138-32.622 20.562-40.226 24.139-71.149 48.68-22.156 17.583-41.568 35.558-61.72 55.676-7.6703 7.6576-14.966 15.752-22.491 23.581-5.6968 5.9276-11.448 11.792-17.172 17.689-4.395 3.6429-8.5177 7.7162-13.185 10.929-2.9444 2.0266-12.261 2.3606-9.5136 4.6942 4.4552 3.7836 11.222 1.5797 16.863 1.5473 0.71264-4e-3 -1.2102-0.93779-1.5279-1.6354-0.85659-1.8808 0.41856-3.1264 1.2162-4.6052 0.74387-0.84893 1.3974-1.8051 2.2316-2.5468 4.308-3.83 10.032-5.6259 15.419-6.4906 3.0734-0.49333 6.486 0.60801 9.2854-0.86437 2.1934-1.1536-4.8666-0.11997-7.2998-0.17997 13.606 0.80715 19.675 0.7519 33.481 3.4143 12.967 2.5004 25.129 6.1226 37.464 11.177 6.1446 2.5181 12.207 5.3082 18.097 8.4712 5.6874 3.0542 11.057 6.7695 16.586 10.154 12.993 10.453 13.543 9.8731 24.092 21.954 2.4746 2.834 3.6383 7.5268 6.9802 8.94 8.4599 3.5775 17.743 4.3683 26.77 5.3322 0.97847 0.10446 1.8683-1.2071 2.1153-2.2478 0.50189-2.1144-0.0174-4.3689-0.0262-6.5534-0.68079-16.324-1.4447-32.641-1.9612-48.974-1.2166-38.473-1.9089-76.966-1.8698-115.46 0.27633-38.898 0.1358-61.488 1.598-100.26 0.52557-13.935 1.4334-27.85 2.2091-41.772 0.8211-14.738 1.5229-28.765 3.1219-43.343 0.32831-2.9934 0.88312-5.9518 1.3247-8.9276 0 0-22.87-0.30353-22.87-0.30353z" />
        <path d="m257.13 12.042c-0.18936 7.5547-0.8709 15.082-1.1214 22.635-0.29499 8.8909-0.37099 17.789-0.65281 26.681-0.30373 9.5825-2.9087 77.9-3.1303 83.75-1.4099 68.519-4.9517 136.96-9.1068 205.33l17.906 0.0565c-0.0677-8.5317-0.18418-17.063-0.20333-25.595-0.13452-59.936 0.9548-119.92 5.1108-179.7 1.112-15.235 2.046-30.488 3.336-45.706 1.0744-12.675 2.3191-25.335 3.7562-37.967 1.0122-8.8964 2.3642-17.743 3.5903-26.607 1.0539-7.6194 2.2166-15.21 3.5103-22.784 0 0-22.995-0.0931-22.995-0.0931z" />
        <path d="m318.27 142.54c-29.51 21.483-60.506 40.502-92.531 57.126-10.441 5.4195-21.078 10.374-31.618 15.561-38.418 17.65-77.801 32.808-117.86 45.372-3.3795 1.0601-6.778 2.0467-10.167 3.0701-4.6955 1.3179-6.9131 1.9994-11.307 3.0603-1.5867 0.3831-2.6067 0.61031-4.1164 0.80407-0.17101 0.022-0.34384 0.0207-0.51577 0.0311 7.8437 1.176 15.687 2.3521 23.531 3.5282 2.4619-0.77581 4.4349-1.4249 7.0939-2.0451 9.5044-2.2166 16.972-3.433 27.066-4.6011 25.112-2.906 33.854-2.9064 60.673-4.3597 13.414-0.0585 26.834-0.60817 40.242-0.17565 9.3242 0.30078 18.619 1.352 27.9 2.3738 12.764 1.4051 25.536 2.8238 38.222 4.9056 19.797 3.2488 39.63 7.9625 58.81 14.298 6.8052 2.2479 13.414 5.1532 20.121 7.7298 11.156 5.2512 22.558 10.742 31.575 19.912 1.471 1.4959 2.6484 3.3036 3.9726 4.9553l21.724-1.7637c-1.5348-1.7658-2.9202-3.7028-4.6045-5.2973-10.017-9.4826-22.428-14.972-34.57-20.28-21.463-7.6911-25.491-9.7639-49.054-15.201-22.46-5.1826-49.897-9.7546-72.594-11.533-39.942-3.1297-58.651-2.4776-96.705-2.4392-12.172 0.54017-24.352 0.89256-36.515 1.6205-16.244 0.97217-31.104 2.2896-47.07 4.6189-10.981 1.602-8.3282 1.5934-16.643 3.2304-0.81921 0.16128-1.6494 0.2471-2.474 0.37067 7.4016 1.2279 14.795 2.5129 22.205 3.6838 0.10992 0.0175 0.20622-0.0915 0.31292-0.12515 0.39924-0.12615 0.80338-0.23299 1.2039-0.35411 4.1172-1.2452 8.2011-2.6179 12.275-4.0214 41.438-14.566 82.352-30.951 122.46-49.447 10.684-5.19 21.443-10.198 32.051-15.57 19.828-10.04 36.828-19.455 56.02-30.586 15.606-9.0503 20.379-12.272 34.69-20.876 2.8154-1.6926 5.658-3.3303 8.487-4.9954 0 0-22.299-2.5808-22.299-2.5808z" />
        <path d="m176.1 35.167c3.5095-0.13633 2.5978-0.0739 7.2329-0.4458 8.5019-0.68212 16.991-1.5452 25.493-2.2247 19.863-1.5876 26.879-1.9167 47.176-3.1581 16.868-0.87452 28.562-1.5865 45.235-2.065 5.7702-0.16561 11.543-0.3538 17.315-0.28605 2.3023 0.027-8.4607-1.44-6.8971 0.40833 1.8436 2.1794 5.4265 0.4437 8.0924 1.0047 1.3758 0.28951 2.6419 1.0214 3.9628 1.532 0.10301 0.42653 0.54942 0.92539 0.30896 1.2796-0.64668 0.95275-1.7176 1.4528-2.6156 2.1186-5.7265 4.2461-9.6701 6.8441-16.185 10.456-13.28 7.3617-18.265 9.2055-32.661 15.691-19.632 8.3717-39.84 14.971-60.198 20.853-5.9753 1.7265-11.989 3.2882-17.985 4.9272-22.146 6.0538-9.0578 2.4136-29.096 8.042-7.7471 2.3846-15.621 4.3119-23.312 6.9194-1.0487 0.35552-2.664 0.09-3.1097 1.1874-0.46628 1.148 0.0487 3.4058 1.1911 3.5363 9.3505 1.0682 18.802-0.11894 28.204-0.17842 3.3826-0.40691 6.7635-0.83145 10.148-1.2207 12.399-1.4262 23.342-2.6255 35.924-3.6843 18.115-1.5246 34.484-2.5235 52.693-3.4392 9.2725-0.46629 18.55-0.81079 27.825-1.2162 20.645-0.70334 26.94-0.97814 46.771-1.4417 5.5729-0.13028 11.146-0.26933 16.72-0.31454 4.1381-0.0335 11.521-4.3409 12.414 0.0782 0.9171 4.5386-22.896-2.2207-7.0128 1.9202 1.1011 0.55164 2.2022 1.1033 3.3033 1.6549 0 0 22.195-2.732 22.195-2.732-1.2581-0.6947-2.5162-1.3894-3.7743-2.0841-15.083-4.3945-4.8195-1.9615-34.973-2.2642-7.8448-0.0787-19.747 0.37936-27.141 0.63635-16.626 0.57784-28.24 1.0591-45.206 1.729-9.2657 0.41322-18.533 0.78474-27.797 1.2397-19.17 0.94134-35.145 1.8357-54.207 3.2483-16.886 1.2514-22.426 1.9009-38.301 3.3217-3.7265 0.33353-7.455 0.6404-11.183 0.9606l16.112 0.55332c-0.51208 0.89652-2.1125 1.841-1.5362 2.6896 0.5559 0.81858 1.7237-0.78057 2.6035-1.118 7.0568-2.707 14.316-4.7397 21.471-7.094 4.1926-1.2605 8.3776-2.5519 12.578-3.7814 5.2792-1.5453 28.452-8.0999 32.928-9.4441 20.345-6.1088 40.565-12.804 60.278-21.065 14.61-6.2861 20.822-8.6203 34.519-15.689 3.746-1.9333 7.4482-3.9782 11.06-6.197 2.803-1.7221 8.924-5.1082 10.054-9.5278 0.3023-1.1827-0.67795-2.3414-1.0169-3.5122-1.637-0.65281-3.2013-1.5908-4.9109-1.9584-10.221-2.1981-39.984-1.3054-41.398-1.299-5.474 0.0247-10.946 0.26493-16.416 0.47672-14.467 0.56007-29.917 1.4645-44.325 2.2489-34.048 1.9718-15.786 0.88049-48.775 2.9197-2.0034 0.12384-22.673 1.4286-28.347 1.7014-4.4454 0.2137-4.5693 0.17998-8.1736 0.16749l22.746 3.94z" />
        <path d="m409.02 29.139c2.7046-0.78463 5.3692-1.759 8.114-2.3539 18.789-4.0721 34.144-5.9647 53.739-8.3993 22.967-2.8537 46.332-5.3428 69.406-7.0478 9.3266-0.68917 18.671-1.0549 28.006-1.5823 3.7253 1.3853 7.9582 0.85569 11.544 2.6132 1.1562 0.56664 2.2725 2.5165 1.669 3.7348-1.1923 2.4067-3.8366 3.5525-5.9797 4.9663-11.722 7.7328-17.601 9.6192-30.873 15.576-21.128 8.4884-42.683 15.693-64.487 21.795-2.1208 0.59354-8.5125 1.088-6.3882 1.6661 7.8059 2.1241 15.975 2.0775 23.963 3.1162 3.1414-0.70119 6.2678-1.488 9.4242-2.1036 15.493-3.0219 26.011-4.6 42.163-6.7058 17.045-2.2221 35.112-4.228 52.259-5.4598 7.3269-0.52634 14.669-0.74879 22.004-1.1232 52.038 0.1501 9.395-0.70099 9.8915 0.99129 0.89187 3.0396 5.8514 0.81054 8.5675 1.9797 1.467 0.63149 3.7671 1.5621 3.6556 3.2819-0.14727 2.2738-2.471 3.7912-4.1966 5.0697-5.2952 3.9232-11.114 6.927-16.67 10.391-10.445 5.2074-20.842 10.532-31.336 15.622-14.474 7.0212-29.043 13.808-43.565 20.71-16.856 8.011-33.709 16.027-50.568 24.029-27.385 12.997-71.302 33.891-99.265 46.76-13.786 6.3444-27.652 12.482-41.477 18.723-42.1 18.41-22.351 9.904-59.217 25.6 0 0 19.023 2.4831 19.023 2.4831 35.104-16.007 16.234-7.3619 56.597-25.968 13.47-6.2926 26.964-12.525 40.411-18.878 58.489-27.631 37.501-18.245 98.651-46.833 67.58-31.595 33.655-15.457 97.157-44.368 11.239-5.1171 22.429-10.363 33.644-15.545 6.2171-3.7527 13.065-6.4638 18.651-11.258 5.8472-5.0181 6.4736-9.943 0.15834-13.052-2.8638-1.4101-6.0658-1.9931-9.1991-2.2274-18.085-1.3523-33.132-0.98383-50.624-0.81109-7.1502 0.42894-14.308 0.72721-21.451 1.2868-16.889 1.3232-35.586 3.4298-52.364 5.5344-18.422 2.3108-36.794 5.008-55.089 8.3163 6.9676 1.2091 13.862 3.144 20.903 3.6274 1.929 0.13242 3.702-1.2169 5.5569-1.811 3.6694-1.1752 7.3505-2.307 11.016-3.4969 17.592-5.711 35.099-11.753 52.314-18.721 6.1839-2.7217 12.486-5.1416 18.552-8.1651 4.0288-2.0082 18.61-8.6099 20.647-16.176 0.56574-2.1008-1.0773-4.7816-2.8609-5.7773-15.349-8.5689-39.109 7.9567-51.647-2.5352-9.0576 0.59213-18.124 1.0467-27.173 1.7764-22.91 1.8473-46.503 4.4535-69.316 7.1327-20.016 2.3508-37.964 4.2705-57.535 8.1131-3.0249 0.59391-5.9662 1.6161-8.9493 2.4242 0 0 22.542 3.082 22.542 3.082z" />
        <path d="m384.4 37.673c-6.9373 5.1664-13.537 10.944-19.696 17.181-0.87845 1.3389-2.0092 2.2926-1.4758 4.1657 0.2392 0.8399 0.69408 1.6744 1.3452 2.191 1.5954 1.2657 5.0601 1.3792 6.7229 1.3514 9.0047-0.15069 18.005-0.53569 27.007-0.80353 9.4348-2.1931 18.497-5.9443 27.08-10.716 0.73924-0.44855 1.4626-0.92984 2.2177-1.3456 0.50673-0.27905 2.1305-0.73572 1.5631-0.73641-7.3156-9e-3 -15.401-2.8808-21.937 0.71154-2.9686 1.6314 0.7621 7.2261 0.88684 10.857 0.34278 9.9775 0.44387 19.964 0.51503 29.948 0.11387 15.976 0.0268 31.954 0.0401 47.931-0.94868 77.51-3.2382 155.01-7.1437 232.41 0 0 20.621 0.0515 20.621 0.0515-0.669-77.481 0.27375-154.99 3.1252-232.41 0.81272-15.974 1.5267-31.955 2.4381-47.923 0.57222-10.025 1.4327-20.029 2.0126-30.053 0.24229-4.1886 3.8022-10.531 0.45369-12.581-13.738-8.4107-18.866-4.7753-27.388 0.40524-8.453 4.6372-17.402 8.2362-26.766 9.9109 5.8823 0.16893 11.768 0.22427 17.647 0.50679 1.2414 0.0597-2.4822 0.15867-3.7247 0.1623-0.8294 2e-3 -1.6564-0.18959-2.4847-0.14418-0.40956 0.0225-0.78438 0.4189-1.1889 0.34558-0.75335-0.13654 2.0862-4.4235 1.095-2.2007 6.0813-6.3044 12.674-12.101 19.951-16.68l-22.917-2.5337z" />
        <path d="m463.79 269.17c-1.437-30.457-1.4932-60.978-0.8247-91.461 0.17523-7.9902 0.47711-15.976 0.71567-23.965 1.1242-25.567 2.4903-51.176 5.963-76.51-5.148 1.6631 2.5139-4.3108 1.148-4.3019-7.4658 0.0486-14.955 0.31019-22.366 1.2979-0.57792 0.077 0.79116 0.96345 1.0255 1.5464 0.60024 1.4932 1.0654 3.0529 1.4561 4.6271 0.71488 2.881 1.2377 5.8149 1.8565 8.7224 0.71546 4.4728 1.4853 8.9355 2.1464 13.418 2.5526 17.309 2.4958 18.941 4.8528 36.825 0.96322 7.3089 2.0037 14.605 2.9942 21.91 3.355 24.742 2.4621 18.099 5.4686 41.627 0.62182 5.071 3.2104 21.109 2.0504 27.512-0.39609 2.1863-1.3544 4.7442-3.1953 5.7005-2.221 1.1537-8.3405 2.2622-7.3738-0.21031 3.6311-9.2872 35.525 5.4787-9.984-9.4106-42.765-14.12-86.775-22.923-130.84-30.529-3.5946-0.57831-7.1893-1.1566-10.784-1.7349l-21.317 3.3649c3.7904 0.53813 7.5808 1.0763 11.371 1.6144 5.0943 0.79918 10.195 1.5504 15.283 2.3975 39.179 6.5235 78.256 14.694 116.11 27.698 23.786 8.513 20.62 8.9313 51.998 10.097 2.6668 0.0991 5.6769-0.33083 7.7585-2.1567 1.778-1.5596 2.3421-4.4429 2.5903-6.9208 0.62146-6.2042-2.4473-22.972-3.181-27.754-2.616-17.962-3.4389-23.068-5.7919-41.602-3.0545-24.06-5.5107-48.199-8.1839-72.31-1.002-6.8473-0.97292-8.187-2.4288-13.972-0.25225-1.0024 0.0566-2.8637-0.88968-2.9632-22.886-2.4065-23.056-7.2427-24.281 5.2285-1.8466 25.531-2.6368 51.134-3.3759 76.727-0.18228 7.9963-0.38327 15.992-0.54679 23.989-0.62381 30.503-0.87901 61.023-2.3049 91.5h22.874z" />
        <path d="m510.84 103.48c-0.13889 2.022-0.32388 4.0408-0.41664 6.0659-0.2558 5.5856-0.37631 11.178-0.6289 16.764-0.62439 13.809-2.7043 52.953-3.3363 63.974-2.4617 42.929-2.5091 41.618-5.5182 84.288-2.3016 29.497-4.6358 58.996-7.4896 88.437-0.48847 5.0393-1.1266 10.061-1.5701 15.105-0.21186 2.4097-2.5627 6.7576-0.3954 7.2494 8.247 1.8713 16.817-1.0769 25.225-1.6154 9.7542-21.731 21.398-42.369 34.091-62.185 12.397-19.352 23.882-35.383 37.988-53.215 5.7898-7.3194 11.926-14.303 17.889-21.454 13.36-14.703 14.74-16.637 27.768-29.591 3.078-3.0606 6.2553-5.9994 9.3899-8.9904 2.7993-2.671 9.1667-7.9882 11.097-12.151 1.0269-2.2142 1.1136-4.8139 1.6704-7.2208-1.3129-4.8239-1.1357-10.48-3.9388-14.472-15.47-22.03-37.296-33.606-60.028-44.571-26.9-12.975-57.436-22.879-86.329-28.831-13.005-2.6789-26.255-3.6626-39.383-5.494-24.821 0.0309-56.825-3.1569-82.068 5.7321-17.242 6.0714-32.661 18.198-45.116 32.27-5.6631 6.3982-10.905 13.375-15.058 21.034-4.0209 7.4155-6.1688 15.868-9.2532 23.802-1.6504 16.054-6.2076 29.118 4.5081 43.441 12.954 17.314 36.498 23.043 55.264 24.244 57.574 3.6861 61.54-1.8828 114.2-16.728 18.969-8.6459 38.305-16.385 56.908-25.938 36.115-18.545 77.795-45.168 112.16-67.418 15.726-10.182 31.29-20.661 46.873-31.102 10.294-6.8964 54.186-36.771 67.187-45.613 15.906-10.76 31.824-21.509 48.035-31.716 4.4932-2.8292 9.009-5.5935 13.655-8.1091 0.3976-0.17507 0.7794-0.40162 1.1929-0.5252 0.1377-0.0412 0.569 0.0548 0.4267 0.0411-23.378-2.2445-15.995-5.2544-23.56-2.1184l23.083 2.1845c5.0106-7.0364 0.7188-0.75203-22.509-3.2259-0.1492-0.0159-0.2167 0.22908-0.3415 0.31991-0.3237 0.23574-0.6668 0.43802-1.0003 0.65703-19.364 12.874-38.015 26.992-56.998 40.514-36.261 26.218-72.479 52.582-109.72 77.126-17.852 11.765-35.731 23.505-54.012 34.452-19.14 11.461-38.378 22.802-58.214 32.748-18.962 9.5077-38.703 17.034-58.055 25.55-17.775 4.7021-35.334 10.523-53.326 14.106-20.681 4.1189-41.692 2.8908-61.536-5.5339-14.743-6.2594-24.427-16.719-26.543-33.997-0.91425-7.4656 1.3318-14.994 1.9977-22.491 3.0351-7.7499 5.164-16.004 9.1054-23.25 4.0811-7.5024 9.1944-14.365 14.76-20.622 12.412-13.955 27.248-25.316 44.404-31.249 17.715-6.1257 29.379-5.4658 46.544-5.874 13.334 1.729 26.787 2.5789 40.001 5.187 28.818 5.6881 59.164 15.273 85.904 28.415 21.636 10.634 41.64 21.634 55.601 43.194 2.3962 3.7005 1.9434 8.8164 2.9151 13.225-0.53054 2.0631-0.67988 4.2924-1.5917 6.1894-1.7711 3.685-7.88 9.4438-10.214 11.876-2.9117 3.035-5.8573 6.032-8.7251 9.1167-12.315 13.246-13.544 15.004-26.319 29.869-16.265 20.263-20.627 25.146-36.33 47.162-12.76 17.891-24.578 35.849-36.194 54.632-4.4283 7.161-8.5563 14.539-12.917 21.75-2.5873 4.2786-5.2833 8.4774-7.9249 12.716 6.5337 1.2281 13.056 4.8372 19.601 3.6842 2.1228-0.37395-0.6986-4.6599-0.71394-7.0114-0.0329-5.0429 0.35074-10.079 0.56953-15.116 1.2816-29.505 2.9783-58.988 4.7888-88.46 0.9534-13.94 1.8367-27.887 2.8603-41.821 2.1972-29.913 3.8725-49.998 6.6971-79.405 0.86442-8.9994 1.7693-17.995 2.7735-26.977 1.4129-12.638 1.5834-13.335 3.0495-22.688 0 0-22.912-0.34585-22.912-0.34585z" />
      </g>
      <g fill={fill.foreground}>
        <path d="m192.42 0.1427c0.49393 17.501 0.27683 35.016 0.61216 52.52 0.26699 13.936 0.83911 27.865 1.0608 41.802 0.6139 38.591 0.35721 61.58 0.23802 100.27-0.26117 38.5-1.0986 76.993-2.352 115.47-0.26112 8.0159-1.0242 28.908-1.4898 38.317-0.17557 3.5479-0.42442 7.091-0.63663 10.637-0.27873 2.1376 0.2873 4.6373-0.83621 6.4128-0.53238 0.84133-3.6009-0.51729-2.7059-0.81513 5.6763-1.8887 13.684 0.97774 17.405-4.0759 2.3576-3.2014-5.2752-5.8602-8.0197-8.6687-12.888-13.189-10.255-10.252-25.574-22.241-5.6752-3.4515-11.202-7.2137-17.026-10.355-17.574-9.4772-36.374-16.252-55.618-20.232-13.534-2.7993-19.369-2.8601-32.673-3.8869-10.777-0.0186-21.557-0.2802-32.332-0.0555-8.7216 0.18186-19.832 1.8693-26.702 8.4814-0.93843 0.90327-1.65 2.0544-2.475 3.0816-1.2523 2.5456-2.2735 3.4326-1.5011 6.5098 0.28756 1.1456 0.53125 2.9667 1.6108 3.0981 9.1077 1.108 18.407 1.7839 27.489 0.44224 4.6523-0.68732 19.275-16.19 20.394-17.275 5.2046-6.0106 10.39-12.041 15.614-18.032 6.9144-7.9298 13.638-16.067 20.8-23.73 19.016-20.344 37.7-38.383 59.178-55.722 30.292-24.453 38.889-28.388 71.278-48.436 28.383-15.68 57.642-29.773 88.269-39.368 10.927-3.4234 23.219-6.3919 34.693-7.2765 3.5973-0.27734 7.2119 0.104 10.818 0.15601-20.672 1.8252-16.328-0.83826-9.4273 3.1777 2.2147 1.2888 4.1531 3.407 4.9721 6.0323 0.14584 0.46749 0.17595 0.96898 0.26395 1.4534l22.859-0.51026c-0.35236-1.8083-0.39129-2.6315-1.3074-4.3346-7.1624-13.315-28.503-8.8741-37.977-9.374-3.3065 0.103-6.6313-0.0841-9.9196 0.30902-10.742 1.2843-22.092 4.4569-32.276 8.0025-29.406 10.238-57.455 24.584-84.778 40.138-32.622 20.562-40.226 24.139-71.149 48.68-22.156 17.583-41.568 35.558-61.72 55.676-7.6703 7.6576-14.966 15.752-22.491 23.581-5.6968 5.9276-11.448 11.792-17.172 17.689-4.395 3.6429-8.5177 7.7162-13.185 10.929-2.9444 2.0266-12.261 2.3606-9.5136 4.6942 4.4552 3.7836 11.222 1.5797 16.863 1.5473 0.71263-4e-3 -1.2102-0.93779-1.5279-1.6354-0.85658-1.8808 0.41856-3.1264 1.2162-4.6052 0.74387-0.84893 1.3974-1.8051 2.2316-2.5468 4.308-3.83 10.032-5.6259 15.419-6.4906 3.0734-0.49333 6.486 0.60801 9.2854-0.86437 2.1934-1.1536-4.8666-0.11997-7.2998-0.17997 13.606 0.80715 19.675 0.7519 33.481 3.4143 12.967 2.5004 25.129 6.1226 37.464 11.177 6.1446 2.5181 12.207 5.3082 18.097 8.4712 5.6874 3.0542 11.057 6.7695 16.586 10.154 12.993 10.453 13.543 9.8731 24.092 21.954 2.4746 2.834 3.6383 7.5268 6.9802 8.94 8.4599 3.5775 17.743 4.3683 26.77 5.3322 0.97847 0.10446 1.8683-1.2071 2.1153-2.2478 0.50189-2.1144-0.0174-4.3689-0.0262-6.5534-0.68079-16.324-1.4447-32.641-1.9612-48.974-1.2166-38.473-1.9089-76.966-1.8698-115.46 0.27633-38.898 0.1358-61.488 1.598-100.26 0.52557-13.935 1.4334-27.85 2.2091-41.772 0.8211-14.738 1.5229-28.765 3.1219-43.343 0.32831-2.9934 0.88312-5.9518 1.3247-8.9276 0 0-22.87-0.30354-22.87-0.30354z" />
        <path d="m263.97 14.602c-0.18936 7.5547-0.8709 15.082-1.1214 22.635-0.29499 8.8909-0.37099 17.789-0.65281 26.681-0.30373 9.5825-2.9087 77.9-3.1303 83.75-1.4099 68.519-4.9517 136.96-9.1068 205.33l17.906 0.0565c-0.0677-8.5317-0.18418-17.063-0.20333-25.595-0.13452-59.936 0.9548-119.92 5.1108-179.7 1.112-15.235 2.046-30.488 3.336-45.706 1.0744-12.675 2.3191-25.335 3.7562-37.967 1.0122-8.8964 2.3642-17.743 3.5903-26.607 1.0539-7.6194 2.2166-15.21 3.5103-22.784 0 0-22.995-0.0931-22.995-0.0931z" />
        <path d="m325.11 145.1c-29.51 21.483-60.506 40.502-92.531 57.126-10.441 5.4195-21.078 10.374-31.618 15.561-38.418 17.65-77.801 32.808-117.86 45.372-3.3795 1.0601-6.778 2.0467-10.167 3.0701-4.6955 1.3179-6.9131 1.9994-11.307 3.0603-1.5867 0.3831-2.6067 0.61031-4.1164 0.80407-0.17101 0.022-0.34384 0.0207-0.51577 0.0311 7.8437 1.176 15.687 2.3521 23.531 3.5282 2.4619-0.77581 4.4349-1.4249 7.0939-2.0451 9.5044-2.2166 16.972-3.433 27.066-4.6011 25.112-2.906 33.854-2.9064 60.673-4.3597 13.414-0.0585 26.834-0.60817 40.242-0.17565 9.3242 0.30078 18.619 1.352 27.9 2.3738 12.764 1.4051 25.536 2.8238 38.222 4.9056 19.797 3.2488 39.63 7.9625 58.81 14.298 6.8052 2.2479 13.414 5.1532 20.121 7.7298 11.156 5.2512 22.558 10.742 31.575 19.912 1.471 1.4959 2.6484 3.3036 3.9726 4.9553l21.724-1.7637c-1.5348-1.7658-2.9202-3.7028-4.6045-5.2973-10.017-9.4826-22.428-14.972-34.57-20.28-21.463-7.6911-25.491-9.7639-49.054-15.201-22.46-5.1826-49.897-9.7546-72.594-11.533-39.942-3.1297-58.651-2.4776-96.705-2.4392-12.172 0.54017-24.352 0.89256-36.515 1.6205-16.244 0.97217-31.104 2.2896-47.07 4.6189-10.981 1.602-8.3283 1.5934-16.643 3.2304-0.81921 0.16128-1.6493 0.2471-2.474 0.37067 7.4016 1.2279 14.795 2.5129 22.205 3.6838 0.10992 0.0175 0.20622-0.0915 0.31292-0.12515 0.39924-0.12615 0.80338-0.23299 1.2039-0.35411 4.1172-1.2452 8.2011-2.6179 12.275-4.0214 41.438-14.566 82.352-30.951 122.46-49.447 10.684-5.19 21.443-10.198 32.051-15.57 19.828-10.04 36.828-19.455 56.02-30.586 15.606-9.0503 20.379-12.272 34.69-20.876 2.8154-1.6926 5.658-3.3303 8.487-4.9954 0 0-22.299-2.5808-22.299-2.5808z" />
        <path d="m182.94 37.727c3.5095-0.13632 2.5978-0.07391 7.2329-0.44579 8.5019-0.68212 16.991-1.5452 25.493-2.2247 19.863-1.5876 26.879-1.9167 47.176-3.1581 16.868-0.87452 28.562-1.5865 45.235-2.065 5.7702-0.16561 11.543-0.3538 17.315-0.28605 2.3023 0.02703-8.4607-1.44-6.8971 0.40833 1.8436 2.1794 5.4265 0.4437 8.0924 1.0047 1.3758 0.2895 2.6419 1.0214 3.9628 1.532 0.10301 0.42654 0.54942 0.92539 0.30896 1.2796-0.64668 0.95275-1.7176 1.4528-2.6156 2.1186-5.7265 4.2461-9.6701 6.8441-16.185 10.456-13.28 7.3617-18.265 9.2055-32.661 15.691-19.632 8.3717-39.84 14.971-60.198 20.853-5.9753 1.7265-11.989 3.2882-17.985 4.9272-22.146 6.0538-9.0578 2.4136-29.096 8.042-7.7471 2.3846-15.621 4.3119-23.312 6.9194-1.0487 0.35552-2.664 0.09-3.1097 1.1874-0.46628 1.148 0.0487 3.4058 1.1911 3.5363 9.3505 1.0682 18.802-0.11894 28.204-0.17842 3.3826-0.40691 6.7635-0.83145 10.148-1.2207 12.399-1.4262 23.342-2.6255 35.924-3.6843 18.115-1.5246 34.484-2.5235 52.693-3.4392 9.2725-0.46629 18.55-0.81079 27.825-1.2162 20.645-0.70334 26.94-0.97814 46.771-1.4417 5.5729-0.13028 11.146-0.26933 16.72-0.31454 4.1381-0.03353 11.521-4.3409 12.414 0.07824 0.9171 4.5386-22.896-2.2207-7.0128 1.9203 1.1011 0.55163 2.2022 1.1033 3.3033 1.6549 0 0 22.195-2.732 22.195-2.732-1.2581-0.69471-2.5162-1.3894-3.7743-2.0841-15.083-4.3945-4.8195-1.9615-34.973-2.2642-7.8448-0.07873-19.747 0.37936-27.141 0.63635-16.626 0.57784-28.24 1.0591-45.206 1.729-9.2657 0.41322-18.533 0.78474-27.797 1.2397-19.17 0.94134-35.145 1.8357-54.207 3.2483-16.886 1.2514-22.426 1.9009-38.301 3.3217-3.7265 0.33353-7.455 0.6404-11.183 0.9606l16.112 0.55332c-0.51208 0.89652-2.1125 1.841-1.5362 2.6896 0.5559 0.81858 1.7237-0.78057 2.6035-1.118 7.0568-2.707 14.316-4.7396 21.471-7.094 4.1926-1.2605 8.3776-2.5519 12.578-3.7814 5.2792-1.5453 28.452-8.0999 32.928-9.4441 20.345-6.1088 40.565-12.804 60.278-21.065 14.61-6.2861 20.822-8.6203 34.519-15.689 3.746-1.9333 7.4482-3.9782 11.06-6.197 2.803-1.7221 8.924-5.1082 10.054-9.5278 0.3023-1.1827-0.67795-2.3414-1.0169-3.5122-1.637-0.65281-3.2013-1.5908-4.9109-1.9584-10.221-2.1981-39.984-1.3054-41.398-1.299-5.474 0.0247-10.946 0.26493-16.416 0.47671-14.467 0.56008-29.917 1.4645-44.325 2.2489-34.048 1.9718-15.786 0.88049-48.775 2.9197-2.0034 0.12384-22.673 1.4286-28.347 1.7014-4.4454 0.2137-4.5693 0.17998-8.1736 0.16749 0 0 22.746 3.94 22.746 3.94z" />
        <path d="m415.86 31.699c2.7046-0.78463 5.3692-1.759 8.114-2.3539 18.789-4.0721 34.144-5.9647 53.739-8.3993 22.967-2.8537 46.332-5.3428 69.406-7.0478 9.3266-0.68917 18.671-1.0549 28.006-1.5823 3.7253 1.3853 7.9582 0.85569 11.544 2.6132 1.1562 0.56664 2.2725 2.5165 1.669 3.7348-1.1923 2.4067-3.8366 3.5525-5.9797 4.9663-11.722 7.7328-17.601 9.6192-30.873 15.576-21.128 8.4884-42.683 15.693-64.487 21.795-2.1208 0.59354-8.5125 1.088-6.3882 1.6661 7.8059 2.1241 15.975 2.0775 23.963 3.1162 3.1414-0.70119 6.2678-1.488 9.4242-2.1036 15.493-3.0219 26.011-4.6001 42.163-6.7058 17.045-2.2221 35.112-4.228 52.259-5.4598 7.3269-0.52634 14.669-0.74879 22.004-1.1232 52.038 0.1501 9.395-0.701 9.8915 0.99129 0.89187 3.0396 5.8514 0.81054 8.5675 1.9797 1.467 0.63149 3.7671 1.5621 3.6556 3.2819-0.14727 2.2738-2.471 3.7912-4.1966 5.0697-5.2952 3.9232-11.114 6.927-16.67 10.391-10.445 5.2074-20.842 10.532-31.336 15.622-14.474 7.0212-29.043 13.808-43.565 20.71-16.856 8.011-33.709 16.027-50.568 24.029-27.385 12.997-71.302 33.891-99.265 46.76-13.786 6.3444-27.652 12.482-41.477 18.723-42.1 18.41-22.351 9.904-59.217 25.6 0 0 19.023 2.4831 19.023 2.4831 35.104-16.007 16.234-7.3619 56.597-25.968 13.47-6.2926 26.964-12.525 40.411-18.878 58.489-27.631 37.501-18.245 98.651-46.833 67.58-31.595 33.655-15.457 97.157-44.368 11.239-5.1171 22.429-10.363 33.644-15.545 6.2171-3.7527 13.065-6.4639 18.651-11.258 5.8472-5.0181 6.4736-9.943 0.15834-13.052-2.8638-1.4101-6.0658-1.9931-9.1991-2.2274-18.085-1.3523-33.132-0.98383-50.624-0.81109-7.1502 0.42894-14.308 0.7272-21.451 1.2868-16.889 1.3232-35.586 3.4298-52.364 5.5345-18.422 2.3108-36.794 5.008-55.089 8.3163 6.9676 1.2091 13.862 3.144 20.903 3.6274 1.929 0.13242 3.702-1.2169 5.5569-1.811 3.6694-1.1752 7.3505-2.307 11.016-3.4969 17.592-5.711 35.099-11.753 52.314-18.721 6.1839-2.7217 12.486-5.1416 18.552-8.1651 4.0288-2.0082 18.61-8.6099 20.647-16.176 0.56574-2.1008-1.0773-4.7816-2.8609-5.7773-15.349-8.5689-39.109 7.9567-51.647-2.5352-9.0576 0.59213-18.124 1.0467-27.173 1.7764-22.91 1.8473-46.503 4.4535-69.316 7.1327-20.016 2.3508-37.964 4.2705-57.535 8.1131-3.0249 0.59391-5.9662 1.6161-8.9493 2.4242 0 0 22.542 3.082 22.542 3.082z" />
        <path d="m391.24 40.233c-6.9373 5.1664-13.537 10.944-19.696 17.181-0.87845 1.3389-2.0092 2.2926-1.4758 4.1657 0.2392 0.8399 0.69408 1.6744 1.3452 2.191 1.5954 1.2657 5.0601 1.3792 6.7229 1.3514 9.0047-0.15069 18.005-0.53569 27.007-0.80354 9.4348-2.1931 18.497-5.9443 27.08-10.716 0.73924-0.44855 1.4626-0.92985 2.2177-1.3457 0.50673-0.27904 2.1305-0.73572 1.5631-0.73641-7.3156-0.0089-15.401-2.8808-21.937 0.71154-2.9686 1.6314 0.7621 7.2261 0.88684 10.857 0.34278 9.9775 0.44387 19.964 0.51503 29.948 0.11387 15.976 0.0268 31.954 0.0401 47.931-0.94868 77.51-3.2382 155.01-7.1437 232.41 0 0 20.621 0.0515 20.621 0.0515-0.669-77.481 0.27375-154.99 3.1252-232.41 0.81272-15.974 1.5267-31.955 2.4381-47.923 0.57222-10.025 1.4327-20.029 2.0126-30.053 0.24229-4.1886 3.8022-10.531 0.45369-12.581-13.738-8.4107-18.866-4.7753-27.388 0.40524-8.453 4.6372-17.402 8.2362-26.766 9.9109 5.8823 0.16893 11.768 0.22427 17.647 0.50679 1.2414 0.05966-2.4822 0.15867-3.7247 0.1623-0.8294 0.0024-1.6564-0.18959-2.4847-0.14417-0.40956 0.02245-0.78438 0.4189-1.1889 0.34557-0.75335-0.13654 2.0862-4.4235 1.095-2.2007 6.0813-6.3044 12.674-12.101 19.951-16.68l-22.917-2.5337z" />
        <path d="m470.64 271.73c-1.437-30.457-1.4932-60.978-0.8247-91.461 0.17523-7.9902 0.47711-15.976 0.71567-23.965 1.1242-25.567 2.4903-51.176 5.963-76.51-5.148 1.6631 2.5139-4.3108 1.148-4.3019-7.4658 0.04859-14.955 0.31019-22.366 1.2979-0.57792 0.07703 0.79116 0.96345 1.0255 1.5464 0.60024 1.4932 1.0654 3.0529 1.4561 4.6271 0.71488 2.881 1.2377 5.8149 1.8565 8.7223 0.71546 4.4728 1.4853 8.9355 2.1464 13.418 2.5526 17.309 2.4958 18.941 4.8528 36.825 0.96322 7.3089 2.0037 14.605 2.9942 21.91 3.355 24.742 2.4621 18.099 5.4686 41.627 0.62182 5.071 3.2104 21.109 2.0504 27.512-0.39609 2.1863-1.3544 4.7442-3.1953 5.7005-2.221 1.1537-8.3405 2.2622-7.3738-0.21031 3.6311-9.2872 35.525 5.4787-9.984-9.4106-42.765-14.12-86.775-22.923-130.84-30.529-3.5946-0.57831-7.1893-1.1566-10.784-1.7349l-21.317 3.3649c3.7904 0.53813 7.5808 1.0763 11.371 1.6144 5.0943 0.79918 10.195 1.5504 15.283 2.3975 39.179 6.5235 78.256 14.694 116.11 27.698 23.786 8.513 20.62 8.9313 51.998 10.097 2.6668 0.0991 5.6769-0.33083 7.7585-2.1567 1.778-1.5596 2.3421-4.4429 2.5903-6.9208 0.62146-6.2042-2.4473-22.972-3.181-27.754-2.616-17.962-3.4389-23.068-5.7919-41.602-3.0545-24.06-5.5107-48.199-8.1839-72.31-1.002-6.8473-0.97292-8.1871-2.4288-13.972-0.25225-1.0023 0.0566-2.8637-0.88968-2.9632-22.886-2.4065-23.056-7.2427-24.281 5.2285-1.8466 25.531-2.6368 51.134-3.3759 76.727-0.18228 7.9963-0.38327 15.992-0.54679 23.989-0.62381 30.503-0.87901 61.023-2.3049 91.5h22.874z" />
        <path d="m517.68 106.04c-0.13889 2.022-0.32388 4.0408-0.41664 6.0659-0.2558 5.5856-0.37631 11.178-0.6289 16.764-0.62439 13.809-2.7043 52.953-3.3363 63.974-2.4617 42.929-2.5091 41.618-5.5182 84.288-2.3016 29.497-4.6358 58.996-7.4896 88.437-0.48847 5.0393-1.1266 10.061-1.5701 15.105-0.21186 2.4097-2.5627 6.7576-0.3954 7.2494 8.247 1.8713 16.817-1.0769 25.225-1.6154 9.7542-21.731 21.398-42.369 34.091-62.185 12.397-19.352 23.882-35.383 37.988-53.215 5.7898-7.3194 11.926-14.303 17.889-21.454 13.36-14.703 14.74-16.637 27.768-29.591 3.078-3.0606 6.2553-5.9994 9.3899-8.9904 2.7993-2.671 9.1667-7.9882 11.097-12.151 1.0269-2.2142 1.1136-4.8139 1.6704-7.2208-1.3129-4.8239-1.1357-10.48-3.9388-14.472-15.47-22.03-37.296-33.606-60.028-44.571-26.9-12.975-57.436-22.879-86.329-28.831-13.005-2.6789-26.255-3.6626-39.383-5.494-24.821 0.03089-56.825-3.1569-82.068 5.7321-17.242 6.0714-32.661 18.198-45.116 32.27-5.6631 6.3982-10.905 13.375-15.058 21.034-4.0209 7.4155-6.1688 15.868-9.2532 23.802-1.6504 16.054-6.2076 29.118 4.5081 43.441 12.954 17.314 36.498 23.043 55.264 24.244 57.574 3.6861 61.54-1.8828 114.2-16.728 18.969-8.6459 38.305-16.385 56.908-25.938 36.115-18.545 77.795-45.168 112.16-67.418 15.726-10.182 31.29-20.661 46.873-31.102 10.294-6.8964 54.186-36.771 67.187-45.613 15.906-10.76 31.824-21.509 48.035-31.716 4.4932-2.8292 9.009-5.5935 13.655-8.1091 0.39761-0.17507 0.7794-0.40162 1.1929-0.5252 0.13774-0.04116 0.56897 0.05478 0.42671 0.04112-23.379-2.2445-15.995-5.2543-23.56-2.1184l23.083 2.1845c5.0105-7.0364 0.71871-0.75203-22.509-3.2259-0.14917-0.01589-0.2167 0.22908-0.34146 0.31992-0.32375 0.23573-0.66686 0.43802-1.0003 0.65703-19.364 12.874-38.015 26.992-56.998 40.514-36.261 26.218-72.479 52.582-109.72 77.126-17.852 11.765-35.731 23.505-54.012 34.452-19.14 11.461-38.378 22.802-58.214 32.748-18.962 9.5077-38.703 17.034-58.055 25.55-17.775 4.7021-35.334 10.523-53.326 14.106-20.681 4.1189-41.692 2.8908-61.536-5.5339-14.743-6.2594-24.427-16.719-26.543-33.997-0.91425-7.4656 1.3318-14.994 1.9977-22.491 3.0351-7.7499 5.164-16.004 9.1054-23.25 4.0811-7.5024 9.1944-14.365 14.76-20.622 12.412-13.955 27.248-25.316 44.404-31.249 17.715-6.1257 29.379-5.4658 46.544-5.874 13.334 1.729 26.787 2.5789 40.001 5.187 28.818 5.6881 59.164 15.273 85.904 28.415 21.636 10.634 41.64 21.634 55.601 43.194 2.3962 3.7005 1.9434 8.8164 2.9151 13.225-0.53054 2.0631-0.67988 4.2924-1.5917 6.1894-1.7711 3.685-7.88 9.4438-10.214 11.876-2.9117 3.035-5.8573 6.032-8.7251 9.1167-12.315 13.246-13.544 15.004-26.319 29.869-16.265 20.263-20.627 25.146-36.33 47.162-12.76 17.891-24.578 35.849-36.194 54.632-4.4283 7.161-8.5563 14.539-12.917 21.75-2.5873 4.2786-5.2833 8.4774-7.9249 12.716 6.5337 1.2281 13.056 4.8372 19.601 3.6842 2.1228-0.37395-0.6986-4.6599-0.71394-7.0114-0.0329-5.0429 0.35074-10.079 0.56953-15.116 1.2816-29.505 2.9783-58.988 4.7888-88.46 0.9534-13.94 1.8367-27.887 2.8603-41.821 2.1972-29.913 3.8725-49.998 6.6971-79.405 0.86442-8.9994 1.7693-17.995 2.7735-26.977 1.4129-12.638 1.5834-13.335 3.0495-22.688 0 0-22.912-0.34585-22.912-0.34585z" />
      </g>
    </svg>
  );
};
export default JackBogart;
