const PSD_REG = /^[0-9a-zA-Z]{6,16}$/;
const chineseReg = /[\u4E00-\u9FA5]{2,11}/;
const identityCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
const taiwanReg = /^[a-zA-Z][0-9]{9}$/;
const passportReg = /^([a-zA-z]|[0-9]){5,17}$/;
const hkMacaoReg = /^([A-Z]\d{6,10}(\w1)?)$/;
const phoneReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
const mailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
let idType = {
  1: identityCardReg,
  2: passportReg,
  3: taiwanReg,
  4: hkMacaoReg
};
export function verifyPhone() {
  return formVerify(
    [
      {
        name: this.newPhone,
        msg: "请输入正确的手机号",
        reg: phoneReg
      },
      { name: this.newImgCode, msg: "验证码不能为空" }
    ],
    this
  );
}
export function verifyImgCode() {
  return formVerify([{ name: this.imgCode, msg: "验证码不能为空" }], this);
}
export function verifyNoteCode() {
  return formVerify([{ name: this.noteCode, msg: "短信验证码不能为空" }], this);
}

export function verifyFirstPhone() {
  return formVerify(
    [
      {
        name: this.newPhone,
        msg: "请输入正确的手机号",
        reg: phoneReg
      },
      { name: this.newNoteCode, msg: "验证码不能为空" }
    ],
    this
  );
}

export function verifyPassword() {
  return formVerify(
    [
      {
        name: this.oldPassword,
        msg: "登录密码格式有误，请输入6-16位数字、字母组合",
        reg: PSD_REG
      },
      { name: this.captcha, msg: "验证码不能为空" }
    ],
    this
  );
}
export function verifyContacts() {
  let array = [
    {
      name: this.newContacts.relation,
      msg: "联系人关系不能为空"
    },
    {
      name: this.newContacts.name,
      msg: "请输入正确的姓名",
      reg: chineseReg
    },
    {
      name: this.newContacts.id_card_type,
      msg: "证件类型不能为空"
    },
    {
      name: this.newContacts.id_card_no,
      msg: "证件不能为空"
    },
    {
      name: this.newContacts.gender,
      msg: "性别不能为空"
    },
    {
      name: this.birthday.year,
      msg: "出生日期不能为空"
    },
    {
      name: this.birthday.month,
      msg: "出生日期不能为空"
    },
    {
      name: this.birthday.day,
      msg: "出生日期不能为空"
    },
    {
      name: this.newContacts.grade,
      msg: "年级不能为空"
    }
  ];
  array.push({
    name: this.newContacts.id_card_no,
    reg: idType[this.newContacts.id_card_type],
    msg: "证件号码格式不正确"
  });
  if (this.newContacts.id_card_type !== 1) {
    array.push({
      name: this.uploadFileId,
      msg: "证件图片不能为空"
    });
  }
  return formVerify(array, this);
}
export function changePassword() {
  return formVerify(
    [
      {
        name: this.newPassword,
        msg: "登录密码格式有误，请输入6-16位数字、字母组合",
        reg: PSD_REG
      },
      {
        name: this.confirmPassword,
        msg: "登录密码格式有误，请输入6-16位数字、字母组合",
        reg: PSD_REG
      },
      {
        name: this.newPassword,
        identical: this.confirmPassword,
        msg: "两次密码不相同"
      }
    ],
    this
  );
}
export function applyInvoice() {
  let array = [
    {
      name: this.invoice.invoice_title,
      msg: "发票抬头不能为空"
    },
    {
      name: this.invoice.content,
      msg: "发票内容不能为空"
    },
    {
      name: this.invoice.phone_of_receiver,
      msg: "收票人手机号格式不正确",
      reg: phoneReg
    },
    {
      name: this.invoice.mailbox_of_receiver,
      msg: "收票人邮箱格式不正确",
      reg: mailReg
    }
  ];
  if (this.invoice.invoice_title === 2) {
    array.push(
      {
        name: this.invoice.unit_name,
        msg: "发票单位不能为空"
      },
      {
        name: this.invoice.identification_number,
        msg: "纳税b人识别号不能为空"
      }
    );
  }

  return formVerify(array, this);
}
export function changeAutonym() {
  let array = [
    {
      name: this.name,
      msg: "请输入正确的姓名",
      reg: chineseReg
    },
    {
      name: this.idType,
      msg: "证件类型不能为空"
    },
    {
      name: this.id,
      msg: "证件号码不能为空"
    }
  ];
  array.push({
    name: this.id,
    reg: idType[this.idType],
    msg: "证件号码格式不正确"
  });
  if (this.idType !== 1) {
    array.push({
      name: this.passport_photo_url,
      msg: "证件图片不能为空"
    });
  }

  return formVerify(array, this);
}

export function formVerify(array = [], context) {
  let mapReturn = false;

  for (let i = 0; i < array.length; i++) {
    if (array[i].identical) {
      if (array[i].name !== array[i].identical) {
        context.$msg(array[i].msg, { type: "error" });
        mapReturn = true;
        break;
      }
    } else if (array[i].reg) {
      if (!array[i].reg.test(array[i].name)) {
        context.$msg(array[i].msg, { type: "error" });
        mapReturn = true;
        break;
      }
    } else if (!array[i].name) {
      context.$msg(array[i].msg, { type: "error" });
      mapReturn = true;
      break;
    }
  }
  return mapReturn;
}
