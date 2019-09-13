import { extend } from 'vee-validate'
import { required, email, min } from "vee-validate/dist/rules"

extend("required", {
    ...required,
    message: "必須項目です."
})

extend("email", {
    ...email,
    message: "有効なメールアドレスではございません."
})

extend("min", {
    ...min,
    message: "{_field_}は{length}文字以上で入力してください."
})

extend("password", {
    validate: (value, { other }) => value === other,
    message: "パスワードと一致していいません.",
    params: [{ name: 'other', isTarget: true }]
})

extend("katakana", {
    validate: value => value.match(/^[ァ-ヶー　]*$/),
    message: "カタカナでない文字が含まれています."
})

extend("postalCode", {
    validate: value => value.match(/^\d{7}$/),
    message: "不正な入力です."
})

extend("number3", {
    validate: value => value.match(/^\d{3}$/),
    message: "3桁で入力してください."
})

extend("number4", {
    validate: value => value.match(/^\d{4}$/),
    message: "4桁で入力してください."
})

extend("number7", {
    validate: value => value.match(/^\d{7}$/),
    message: "7桁で入力してください."
})