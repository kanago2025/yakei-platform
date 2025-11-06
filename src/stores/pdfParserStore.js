// stores/pdfParserStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePdfParserStore = defineStore('pdfParser', () => {
  // 状态
  const processingState = ref('idle') // idle, parsing, complete, error
  const processedQuestions = ref([])
  const parsingProgress = ref(0)
  const currentFile = ref(null)
  
  // PDF解析配置
  const parsingConfig = ref({
    autoDetectFields: true,
    generateChineseExplanations: true,
    assignDifficultyAutomatically: true,
    defaultYear: 1998, // 平成10年
    language: 'japanese'
  })

  // 分野映射规则
  const fieldMapping = {
    1: { start: 1, end: 10, field: '权利关系' },
    2: { start: 11, end: 14, field: '宅建业法' },
    3: { start: 15, end: 20, field: '法令上的制限' },
    4: { start: 21, end: 26, field: '税・その他' },
    5: { start: 27, end: 50, field: '宅建业法' }
  }

  // 知识点自动分类规则
  const topicDetectionRules = {
    '权利关系': [
      { keywords: ['時効', '占有', '取得時効'], topic: 'timelimit_possession' },
      { keywords: ['抵当権', '担保', '競落'], topic: 'mortgage_rights' },
      { keywords: ['賃貸借', '転貸', '敷金'], topic: 'lease_rights' },
      { keywords: ['相続', '遺産', '相続人'], topic: 'inheritance' },
      { keywords: ['代理', '意思表示', '許数'], topic: 'agency' }
    ],
    '宅建业法': [
      { keywords: ['免許', '登録', '主任者'], topic: 'license_system' },
      { keywords: ['重要事項説明', '37条書面'], topic: 'important_matters' },
      { keywords: ['報酬', '料金', '手数料'], topic: 'compensation' },
      { keywords: ['営業保証金', '保証協会'], topic: 'operation_deposit' },
      { keywords: ['広告', '誇大広告'], topic: 'advertisement' }
    ],
    '法令上的制限': [
      { keywords: ['都市計画', '市街化区域'], topic: 'urban_planning' },
      { keywords: ['建築基準', '容積率', '建ぺい率'], topic: 'building_standards' },
      { keywords: ['開発許可', '造成'], topic: 'development_permit' },
      { keywords: ['農地法', '転用'], topic: 'farmland_law' }
    ],
    '税・その他': [
      { keywords: ['不動産取得税', '登録免許税'], topic: 'acquisition_tax' },
      { keywords: ['譲渡所得', '特別控除'], topic: 'transfer_income' },
      { keywords: ['鑑定評価', '価格'], topic: 'appraisal' }
    ]
  }

  // 方法
  const parsePdfFile = async (file, answerData = null) => {
    processingState.value = 'parsing'
    currentFile.value = file
    
    try {
      // 模拟PDF解析过程 - 实际项目中这里应该调用后端API
      await simulatePdfParsing(file)
      
      // 基于您提供的PDF内容生成结构化题目
      const questions = generateStructuredQuestions(answerData)
      processedQuestions.value = questions
      processingState.value = 'complete'
      
      return questions
    } catch (error) {
      processingState.value = 'error'
      throw error
    }
  }

  const simulatePdfParsing = (file) => {
    return new Promise((resolve) => {
      const totalSteps = 5
      let currentStep = 0
      
      const progressInterval = setInterval(() => {
        currentStep++
        parsingProgress.value = (currentStep / totalSteps) * 100
        
        if (currentStep >= totalSteps) {
          clearInterval(progressInterval)
          resolve()
        }
      }, 500)
    })
  }

  const generateStructuredQuestions = (answerData) => {
    // 基于您提供的PDF内容生成结构化题目
    const questions = []
    
    // 示例题目1 - 基于您提供的PDF内容
    questions.push({
      year: 1998,
      field: '权利关系',
      topic_id: 'timelimit_possession',
      difficulty: 3,
      question_type: 'single_choice',
      question_text_ja: 'Aの所有する土地をBが取得したが，Bはまだ所有権移転登記を受けていない。この場合，民法の規定及び判例によれば，Bが当該土地の所有権を主張できない相手は，次の記述のうちどれか。',
      options_ja: JSON.stringify([
        { "A": "Aから当該土地を貸借し，その上に自己名義で保存登記をした建物を所有している者" },
        { "B": "Bが移転登記を受けていないことに乗じ，Bに高値で売りつけ不当な利益を得る目的でAをそそのかし，Aから当該土地を購入して移転登記を受けた者" },
        { "C": "当該土地の不法占拠者" },
        { "D": "Bが当該土地を取得した後で，移転登記を受ける前に，Aが死亡した場合におけるAの相続人" }
      ]),
      correct_answer: answerData ? answerData[1] : "1", // 从答案PDF获取
      explanation_zh: "根据民法第177条，不动产物权变动未经登记不得对抗善意第三人。选项1中的情形，建筑物保存登记的效力可以对抗未登记的土地所有权。",
      is_from_past_exam: true,
      is_five_question_exempt: false,
      tags: JSON.stringify(["取得時効", "所有権", "登記"]),
      source_file: currentFile.value?.name || '平成10年真题'
    })

    // 示例题目2
    questions.push({
      year: 1998,
      field: '权利关系', 
      topic_id: 'mortgage_rights',
      difficulty: 4,
      question_type: 'single_choice',
      question_text_ja: 'Aは，Bから借金をし，Bの債権を担保するためにA所有の土地及びその上の建物に抵当権を設定した。この場合，民法の規定及び判例によれば，次の記述のうち誤っているものはどれか。',
      options_ja: JSON.stringify([
        { "A": "Bの抵当権の実行により，Cが建物，Dが土地を競落した場合，Dは，Cに対して土地の明渡しを請求することはできない。" },
        { "B": "Aは，抵当権設定の登記をした後も建物をEに賃貸することができ，Bに損害を及ぼすことなく期間3年以内の賃貸借でその登記があるとき，Eは，建物の競落人に対して賃借権を対抗しうる。" },
        { "C": "Bは，第三者Fから借金をした場合，Aに対する抵当権をもって，さらにFの債権のための担保とすることができる。" },
        { "D": "Aから抵当権付きの土地及び建物を買い取ったGは，Bの抵当権の実行に対しては，自ら競落する以外にそれらの所有権を保持する方法はない。" }
      ]),
      correct_answer: answerData ? answerData[5] : "4",
      explanation_zh: "选项4错误，因为抵当权设定后取得所有权的人可以通过清偿债务、代位清偿等方式保持所有权，不一定需要自己竞落。",
      is_from_past_exam: true,
      is_five_question_exempt: false,
      tags: JSON.stringify(["抵当権", "競落", "賃貸借"]),
      source_file: currentFile.value?.name || '平成10年真题'
    })

    // 可以继续添加更多题目...
    
    return questions
  }

  const detectTopic = (questionText, field) => {
    const rules = topicDetectionRules[field] || []
    for (const rule of rules) {
      for (const keyword of rule.keywords) {
        if (questionText.includes(keyword)) {
          return rule.topic
        }
      }
    }
    return 'general' // 默认主题
  }

  const assignDifficulty = (questionText) => {
    // 基于题目长度和关键词自动分配难度
    const length = questionText.length
    if (length > 500) return 5
    if (length > 300) return 4
    if (length > 150) return 3
    return 2
  }

  const clearProcessedData = () => {
    processedQuestions.value = []
    processingState.value = 'idle'
    parsingProgress.value = 0
    currentFile.value = null
  }

  return {
    // 状态
    processingState,
    processedQuestions,
    parsingProgress,
    currentFile,
    parsingConfig,
    
    // 方法
    parsePdfFile,
    clearProcessedData,
    detectTopic,
    assignDifficulty
  }
})