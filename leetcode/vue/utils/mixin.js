import request from '../axios/request'

const GET_CODE_TEXT = '发送验证码'
import $msg from './message'

export const mixSetTime = {
  data() {
    return {
      mixTimeId: [],

    }
  },
  beforeDestroy() {
    this.mixTimeId.map((item) => {
      clearInterval(item)
    })
  },
  methods: {
    mixSetCodeTime(type) {
      let time = 61
      time--
      this[type] = time
      this.mixTimeId[this.mixTimeId.length] = setInterval(() => {
        time--
        this[type] = time
        if (time <= 0) {
          this[type] = GET_CODE_TEXT
          clearInterval(this.mixTimeId[this.mixTimeId.length - 1])
        }
      }, 1000)
    },
  }
}
export const lackFilter = {
  filters: {
    lack(value) {
      if (!value) {
        return '暂无'
      } else {
        return value
      }
    }
  }
}
export const uploadFile = {
  data() {
    return {
      uploadFileId: '',
      uploadFileImg: '',
    }
  },
  computed: {
    ossUrl() {
      return this.$store.state.ossUrl
    },
  },

  methods: {

    async uploadFile(e, b) {
      let formFile = new FormData()
      let file = document.querySelector('#files').files[0]
      formFile.append('file', file)
      let data = await request.upload(formFile)
      try {
        this.uploadFileId = data.data.file_id
        this.uploadFileImg = this.ossUrl + '/' + data.data.file_id

      } catch (e) {

      }
    },
  }
}
// 生日的 年月日
export const birthdayEnum = {
  computed: {
    enumYear() {
      return Array.from(new Array(150)).map((item, index) => {
        let year = new Date().getFullYear() - 120
        return {
          label: year + index,
          value: (year + index).toString()
        }
      })
    },
    enumMonth() {
      return Array.from(new Array(12)).map((item, index) => {
        return {
          label: index + 1 > 9 ? index + 1 : '0' + (index + 1),
          value: index + 1 > 9 ? (index + 1).toString() : '0' + (index + 1)
        }
      })
    },
    enumDay() {

      var date = new Date(`${this.birthday.year}-${this.birthday.month}`,)
      //将当前月份加1，下移到下一个月
      date.setMonth(date.getMonth() + 1)
      //将当前的日期置为0，
      date.setDate(0)
      //再获取天数即取上个月的最后一天的天数
      var days = date.getDate()

      return Array.from(new Array(days ? days : 31)).map((item, index) => {
        return {
          label: index + 1 > 9 ? index + 1 : '0' + (index + 1),
          value: index + 1 > 9 ? (index + 1).toString() : '0' + (index + 1)
        }
      })
    }
  }
}
// 搜索页面 根据url获取值
export const searchQuery = async (query, activeIndex, name = '', date='') => {

// 学年
  const studyYear = [
    { name: '全部', id: 0 },
    { name: '2019', id: 2019 },
    { name: '2020', id: 2020 },
    { name: '2021', id: 2021 },
    { name: '2022', id: 2022 },
    { name: '2023', id: 2023 }
  ]
// 学期
  const semester = [
    { name: '全部', id: 0 },
    { name: '春', id: 1 },
    { name: '夏', id: 2 },
    { name: '秋', id: 3 }
  ]
  // 年龄
  const ageRange = [
    { name: '不限', id: 0 },
    { name: '0-2岁', id: 1 },
    { name: '3-6岁', id: 2 },
    { name: '7-13岁', id: 3 },
    { name: '13岁以上', id: 4 }
  ]
// 面试
  const interview = [
    { name: '不限', id: 0 },
    { name: '面试', id: 1 },
    { name: '不面试', id: 2 }
  ]
// 班级类型
  const classType = [
    { name: '不限', id: 0 },
    { name: '秒杀', id: 1 },
    { name: '摇号', id: 2 }
  ]


  // 根据url 标记
  let activeInit = query => {
    activeIndex.center = Number(query.center) || 0
    activeIndex.specialty = Number(query.specialty) || 0
    activeIndex.studyYear = Number(query.studyYear) || 0
    activeIndex.semester = Number(query.semester) || 0
    activeIndex.ageRange = Number(query.ageRange) || 0
    activeIndex.interview = Number(query.interview) || 0
    activeIndex.classType = Number(query.classType) || 0
    name = query.name || ''
    date = query.date || ''

  }

  // 获取第一页列表信息
  let getListData = async () => {
    let params = { page_no: 1, page_size: 10 }

    if (activeIndex.center) {
      params.center = activeIndex.center
      params.professional_id = activeIndex.center
    }
    if (activeIndex.studyYear) {
      params.year = activeIndex.studyYear
    }
    if (activeIndex.semester) {
      params.term = activeIndex.semester
    }
    if (name) {
      params.class_or_profess = name
    }
    if (activeIndex.specialty) {
      params.professional_id = activeIndex.specialty
    }
    if (activeIndex.ageRange) {
      if (activeIndex.ageRange === 1) {
        // params.max_age = 2
        params.min_age = 2
      } else if (activeIndex.ageRange === 2) {
        params.max_age = 6
        params.min_age = 3
      } else if (activeIndex.ageRange === 3) {
        params.max_age = 13
        params.min_age = 7
      } else if (activeIndex.ageRange === 4) {
        params.max_age = 13
      }
    }
    if (activeIndex.classType) {
      params.is_rocking_number = activeIndex.classType
    }
    if (activeIndex.interview) {
      params.is_interview = activeIndex.interview
    }
    if (date && date.split('~')) {
      params.begin_open_class_date = date?date.split('~')[0]:''
    }
    if (date && date.split('~')) {
      params.end_open_class_date = date?date.split('~')[1]:''
    }

    let data = await request.searchConditions(params)
    try {

      return data.data.list
    } catch (e) {
      return []
    }
  }

  // 获取url上的标签
  let setFiltrateList = query => {
    let array = []
    let centerName = centerList.find(
      item => item.id === Number(query.center)
    )
    let specialtyName = specialtyList.find(
      item => item.id === Number(query.specialty)
    )
    let studyYearName = studyYear.find(
      item => item.id === Number(query.studyYear)
    )
    let semesterName = semester.find(
      item => item.id === Number(query.semester)
    )
    let ageRangeName = ageRange.find(
      item => item.id === Number(query.ageRange)
    )
    let interviewName = interview.find(
      item => item.id === Number(query.interview)
    )
    let classTypeName = classType.find(
      item => item.id === Number(query.classType)
    )

    if (centerName && centerName.id) {
      array.push({
        name: centerName.name,
        type: 'center',
        id: centerName.id
      })
    }
    if (specialtyName && specialtyName.id) {
      array.push({
        name: specialtyName.name,
        type: 'specialty',
        id: specialtyName.id
      })
    }
    if (studyYearName) {
      array.push({
        name: studyYearName.name,
        type: 'studyYear',
        id: studyYearName.id
      })
    }
    if (semesterName) {
      array.push({
        name: semesterName.name,
        type: 'semester',
        id: semesterName.id
      })
    }
    if (ageRangeName) {
      array.push({
        name: ageRangeName.name,
        type: 'ageRange',
        id: ageRangeName.id
      })
    }
    if (interviewName) {
      array.push({
        name: interviewName.name,
        type: 'interview',
        id: interviewName.id
      })
    }
    if (classTypeName) {
      array.push({
        name: classTypeName.name,
        type: 'classType',
        id: classTypeName.id
      })
    }
    if (date) {
      array.push({
        name: date,
        type: 'date',
        id: date
      })
    }



    return array
  }
  // 获得中心
  let getCenter = async () => {
    let data = await request.centerList()
    if (data && data.data && data.data.data_list) {
      data.data.data_list.unshift({ name: '全部', id: 0 })
      return data.data.data_list
    }
  }
  // 获取专业
  let getSpecialtyList = async () => {
    let data = await request.specialtyList(query.center || 0)
    try {
      data.data.data_list.unshift({ name: '全部', id: 0 })
      return data.data.data_list
    } catch (e) {
    }
  }

  activeInit(query)
  let centerList = await getCenter()
  let specialtyList = await getSpecialtyList()
  let filtrateList = setFiltrateList(query)
  let dataList = await getListData()

  return {
    name,
    date,
    centerList,
    specialtyList,
    filtrateList,
    dataList,
    studyYear,
    semester,
    ageRange,
    interview,
    classType,
  }
}
