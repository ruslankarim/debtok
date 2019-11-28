var Config = {}
Config.forms = {
  'Создание клиента': '1xMdbPKQXave1RatGPMezLWkvxDIwifbb6qCT7_le75E',
  'Создание должника': '1DEYfroAbU8YtXGaWaPYUH1yJMnZvl9YNOfwR_BkuZCQ',
  'Создание дела': '1ZWuXpWyQ7nG72P-qZZjZ5ClQySKdY8zHVJodFqeih3s',
  'Документы': '17A2YIzhmmINXRBoTLkpCIdbSWVlC6I37wlXenh8F180',
  'Работа с клиентами ati.su': '136Sar2tjVQYH6_PCjOnJw3e7Z-oSOk8Knlf1QAZtDcs',
  'buildocx': '1dypcyBKKL1Pgnhag-3ZLoyJLqvlwoKIBt4xjlb53Z64'
}

Config.templates = {
  pretension: {
    common: '1WdUBPgfdsasIqaGLwIWcobVRgGHyRLt0uBBRfbBME3Q',
    cargo: '1DcaE_Slf_XUE0k2day54nyRcE_vM-5pkjKUwJvrshrE',
    cargoAtiSu: '1VMMUaQ_o1MndnRLYnBlEe_nWkjVUYZDBa9mqi7L-RBI',
    buildocxPretension : '1-laVqlDrkeNz3Vj34_85shA5bHuwm7CmZWwPZmL8voQ',
    buildocxContract : '1_ui4SnWaiMxq1K4A4P32AAiVZYTN7ZQOMcE8n0EQzBA',
    buildocxClaim : '1BJu9uk4xPnkeKG_70wRdhYrg5WPAE2ds-gK0Xkovfjg',

  }
}

Config.idErrLogsSheet = '1OeOA2hahy5yfdPFMcgCcl8FeYOejZhEzkLSN2k6TCJY'
Config.tokenDadata = 'cf6212cbb0fcc735492add9ca259e00e9ae8df2e'
Config.rootFolder = '14azQ9qb7wjSeqFriOen-G6pkgSkCsR44'
Config.buildocx = '1tcIZkBwKky2z4LGsFOc6i1KPRQVhtJDd'

Config.cloudFunctions = {
  baseUrl: 'https://us-central1-buildocx.cloudfunctions.net/main/',
  requestfordadata: 'requestfordadata',
  requestfortask: 'requestfortask',
  requestforcheckstatus: 'requestforcheckstatus',
  requestforresult: 'requestforresult'
}

Config.firestore = {
    email: 'buildocx@buildocx.iam.gserviceaccount.com',
    key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCK3aPeMApCRaa\nN4CVQIWfEj2/yLaifPk7AMKL6NhyaWOdTKRavhiGUSBozLzjSdZy1hTfthax1v3X\ncGAw0uZToFk00RwMPhBk7wdlUQZK5m+Qm65LDxuRcQqumMwxVyz2ygUZKxllQkmE\nLHUK4UHbv6jauQw/oMhgByCCu7bvu0PhdHRZKSY4nd1ZmiX6pTbiSS7sNGPVj0m5\nPPS68HRggYe7TftmqP5scokdB6MOADmE1gc0Bo5wa8p5HrxjyhkRfYoWy6H9V5Nf\nUX4Z1eqf+xVrX1GuLfj43pdR2+K28EvVqci7gqQIyBCDsKCXRwqWD8MNqHN9FC2P\nng3XEMp3AgMBAAECggEACa5IEXwoPIOG/HZi804Nu3IZ4Qt9S5mmhXISwQ4BaKbn\ngAq3sQyERYIa9w6qJjzis8QHs2WtOP2ql0iziwugzy+R8wev+c5IW/fs6vjAsxBN\nJK0WYgilS7mSmkTk/VrG06Eb4vbao8lLyAq9ZSb49R9XqFwMh8mY4+zHCq2YP9iE\niJfzevX6pAF6d4VG0wUcWjRQiRhEO19NNkhlrL4rumdJRZxJA8jNGAOB+iIjCj2I\nTCxA94wRLB4qTO50gnW5TChXTHIeeDeS43RDl467uApcxHytJeyGR6lNXZ+RcBDJ\ndzV+14/a1Xb6s0WjI+yoj/oEf4Fax9L3cHTVv0XPTQKBgQDyqQCXjT6AH3uFwm1S\nWvqbDoa46nS+mx2KQjPpDN8foZ8eMUKhFF6/klVEysRI8NlMouozW0U3rHYAYdse\ntwHQ3MSKXZGCSElE+QvL589wtQy7vTks9957es025b+Rb+5YFts8H/VqMEl3XjXD\n6dWsygKR8xkJTA1YvOeeUXVzRQKBgQDM2Awf8nd4YjkQpaZ5G/g4xXzAj7rDJWfK\ni2Wn0LWWq0vkq5KSD2VS9m3PBjfSROhcqwjsMGxaoRGv/l5qUyyB4P9lv55qRIGq\nGld6MOcnoat+8jy8bIhuyaqpQIP3XQFwv7X7vSWytes2wviJvfNihslEQgUH7g87\nqPifilekiwKBgQDl/0N9YbW8sJpedKMzrOHdN85/1FGlG9bK5ebX3IhbLdBoSJ5z\nmKAZibRiSKH01LvRxJSg6sBXfZI22Ilcum7xLV7oGrnBN4yi4D7LHMNke2Y/R6G6\nupFYjlOV1ftV+TZ6redMPKpa5LutdVEWiTsq1CnNdhHj2v7Hff029NSS1QKBgQCm\nEHgz5hNoquhsUH6XLE+dZqzuRxc3YTm1gDDXTWIJVbFfHqDifEy+Zz06WmYitu5R\nQe8n21HcXzvBm8vbErbATDGAwUmiCQu9ZUGJs9+Rx4UKk0Md1jb86czLDZxuix3B\n1AmqnfrT2Jtpd8KZmD6Zn3/HMGZ3uUzsJt34KOVIZQKBgGwKT6MX7Lm1r+vDlWaG\nua2W7wspjhlNDEe4kj3QunoGQ8k3O11MK9GIOf+7100cRGxpB1vZ7gv9cJUYKBpe\nhmlZVZa48pjv5Yv2pXkfOVcWuw264gyNeKsH63LuvwzR1CL71MRNOIDFXeq/7wdh\nSYIGLqgVoYNKGswYZBWj8r5V\n-----END PRIVATE KEY-----\n',
    projectId: 'buildocx'
}

Config.messages = {
  isClientExist: {
    toEmail: {
      subject: 'Вы только, что заполнили форму: ',
      body: 'Однако эта форма заполняется только один раз, далее вся работа осуществляется через формы созданные специально для вас, на указанный Вами аккаунт'
    },
    toErrLog: ''
  },
  innClientIsInCorrect: {
    toEmail: {
      subject: 'Вы только, что заполнили форму, но что-то пошло не так!',
      body: 'Вы ввели не корректный номер ИНН контрагента. Вы можете исправить его пройдя по следующей ссылке: ',
    },
    toErrLog: 'Некорректный номер ИНН: '
  },
  innManagerIsInCorrect: {
    toEmail: {
      subject: 'Вы только, что заполнили форму, но что-то пошло не так!',
      body: 'Вы ввели не корректный номер ИНН управляющего (УК). Вы можете исправить его пройдя по следующей ссылке: ',
    },
    toErrLog: 'Некорректный ИНН управляющей организации: '
  },
  innManagerDadata: {
    toEmail: {
      subject: 'Вы только, что заполнили форму, но что-то пошло не так!',
      body: 'По указанному Вами номеру ИНН управляющего (УК) определить не удалось. Вы можете исправить его пройдя по следующей ссылке: ',
    },
    toErrLog: 'Некорректный номер ИНН управляющей организации: '
  },
  inCorrectDataManagerIP: {
    toEmail: {
      subject: 'Вы только, что заполнили форму',
      body: 'Заполняя форму Вы указали, что полномочия исполнительного органа не переданы управляющему, но у нас есть основания полагать что это может быть не так. Скорее всего полномочия переданы управляющему - индивидуальному предпринимателю. Уточните эти сведения и отредактируйте свои ответы: ',
    },
    toErrLog: 'Возможно не точные сведения об исполнительном органе'
  },
  innClientDadata: {
    toEmail: {
      subject: 'Вы только, что заполнили форму, но что-то пошло не так!',
      body: 'Вы ввели не корректный номер ИНН контрагента. Вы можете исправить его пройдя по следующей ссылке: ',
    },
    toErrLog: 'Некорректный номер ИНН управляющей организации: '
  },
  inconsistentData: {
   toEmail: {
     subject: 'Вы только, что заполнили форму, но внесенны несогласованные данные!',
     body: 'Вы указали, что полномочия исполнительного органа переданы управляющему, но есть основания полагать что это не так, хоты мы и неможем утверждать этого однозначно, поэтому рекомендуем Вам уточнить эти сведения и при необходимости скорректировать эти свдения по следующей ссылке: ',
    },
   toErrLog: 'Возможно несогласованные данные'
  },
  bikClientDadata: {
   toEmail: {
     subject: 'Вы только, что заполнили форму, но что-то пошло не так!',
     body: 'По указанному Вами БИК банковскую ораганизацию определить не удалось. Вы можете исправить его пройдя по следующей ссылке: '
    },
   toErrLog: 'Некорректный БИК' 
  },
  rsClientDadata: {
    toEmail: {
      subject: 'Вы только, что заполнили форму, но что-то пошло не так!',
      body:  'Номер расчетного счета не соответствует введенному Вами БИК, уточните эти сведения и внесите соответсвующие исправления по следующей ссылке: '
    },
    toErrLog: 'Не корректный номер расчетного счета: '
  },
  indefManegement: {
    toEmail: {
      subject: 'Вы только, что заполнили форму, но что-то пошло не так! Форма: ',
      body: 'К сожалению сведения о руководстве организации определить не удалось, возможно полномочия исполнительного органа переданы управляющему, Вы можете скорректировать эти сведения: '
    },
    toErrLog: ''
  },
  isClient: {
    toEmail: {
      subject: 'Вы только, что заполнили форму: ',
      body: 'Однако контрегент с таким ИНН уже существует в базе контрагентов, ИНН: '
    },
    toErrLog: ''
  },
  isCreditorExist: {
    toEmail: {
      subject: 'Кредитор уже внесен в базу',
      body: 'Воспользуйтесь формой изменения сведений о кредиторе'
    },
    toErrLog: ''
  },
  isDebtorNotExist: {
    toEmail: {
      subject: 'Сведения о должнике отсутствуют в базе данных',
      body: 'Прежде чем использовть эту форму необходимо внести данные о должнике'
    },
    toErrLog: ''
  },
  isClientExistAtiSu: {
    toEmail: {
      subject: 'Email адрес зарегистрирован в базе: ',
      body: 'Email адрес зарегистрирован в базе: '
    },
    toErrLog: ''
  },
}

Config.emails = {
  admin: 'yoursluzhba@gmail.com',
}