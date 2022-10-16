import * as Yup from "yup";

export const showtimeValidationSchema = Yup.object().shape({
  maRap: Yup.string().required("(*) Vui lòng chọn rạp"),
  giaVe: Yup.number()
    .required("(*) Vui lòng nhập giá")
    .min(75000, "(*) Giá thấp nhất 75k")
    .max(200000, "(*) Giá cao nhất 200k")
});
