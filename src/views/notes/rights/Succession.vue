<!-- src/views/notes/rights/Succession.vue -->
<template>
  <div class="succession-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>相続</span>
        </div>
        <h1>相続（继承）</h1>
        <p>日本民法中的继承制度，涉及法定继承人、继承份额、遗产分割、遗嘱继承及配偶者居住权等重要内容</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">18</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">60分钟</span>
            <span class="stat-label">建议学习时间</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">5</span>
            <span class="stat-label">练习题</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ userProgress }}%</span>
            <span class="stat-label">掌握进度</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 快速导航 -->
        <div class="quick-nav">
          <h3>本页导航</h3>
          <div class="nav-links">
            <a 
              v-for="section in sections" 
              :key="section.id"
              :href="`#${section.id}`"
              class="nav-link"
              @click.prevent="scrollToSection(section.id)"
            >
              <span class="nav-icon">{{ section.icon }}</span>
              {{ section.title }}
            </a>
          </div>
        </div>

        <!-- 学习目标 -->
        <section class="learning-goals">
          <h2>🎯 学习目标</h2>
          <ul>
            <li>理解继承的基本概念和继承开始的时间</li>
            <li>掌握法定继承人的顺序和继承份额的计算方法</li>
            <li>熟悉继承的承认、放弃和限定承认的区别</li>
            <li>了解代袭继承的适用条件和限制</li>
            <li>掌握遗嘱的形式要件和法律效力</li>
            <li>理解遗留分的概念和计算方法</li>
            <li>熟悉配偶者居住权的适用条件和法律效果</li>
          </ul>
        </section>

        <!-- 关键术语 -->
        <section id="key-terms" class="key-terms">
          <h2>🔤 关键术语</h2>
          <div class="terms-grid">
            <div 
              v-for="term in keyTerms" 
              :key="term.japanese"
              class="term-card"
            >
              <div class="term-japanese">{{ term.japanese }}</div>
              <div class="term-chinese">{{ term.chinese }}</div>
              <div class="term-explanation">{{ term.explanation }}</div>
              <div class="term-example">{{ term.example }}</div>
            </div>
          </div>
        </section>

        <!-- 基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 继承的基本概念</h2>
          
          <h3>继承的定义</h3>
          <div class="concept-explanation">
            <p>继承是指被继承人死亡后，其权利义务（包括财产和债务）由其继承人概括承受的法律制度。</p>
            
            <div class="example-box">
              <h4>📝 重要提醒</h4>
              <p>继承不仅仅是继承财产，还包括继承债务！如果被继承人有借款等债务，继承人需要在继承财产范围内承担偿还责任。</p>
            </div>
          </div>

          <h3>继承关系中的角色</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">👤</div>
              <div class="timing-content">
                <h4>被继承人</h4>
                <p>死亡的人，其权利义务将被继承</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">👥</div>
              <div class="timing-content">
                <h4>继承人</h4>
                <p>继承被继承人权利义务的人</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💰</div>
              <div class="timing-content">
                <h4>遗产</h4>
                <p>被继承人留下的财产和债务的总和</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 法定继承人 -->
        <section id="legal-heirs" class="content-section">
          <h2>2. 法定继承人</h2>
          
          <h3>继承人的顺序</h3>
          <div class="heir-order">
            <p>日本民法规定了严格的继承人顺序，配偶者是常备继承人，与其他顺序的血亲共同继承。</p>
            
            <div class="order-flow">
              <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>第一顺位：子女</h4>
                  <p>包括婚生子女、非婚生子女、养子女、胎儿</p>
                  <div class="step-note">配偶者 + 子女</div>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>第二顺位：直系尊属</h4>
                  <p>父母、祖父母等</p>
                  <div class="step-note">配偶者 + 直系尊属</div>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>第三顺位：兄弟姐妹</h4>
                  <p>包括全血缘和半血缘兄弟姐妹</p>
                  <div class="step-note">配偶者 + 兄弟姐妹</div>
                </div>
              </div>
            </div>
          </div>

          <h3>重要注意事项</h3>
          <div class="important-notes">
            <div class="note-item">
              <h4>🚫 不包括的人员</h4>
              <ul>
                <li><strong>前配偶：</strong>离婚后的前配偶不是继承人</li>
                <li><strong>事实婚姻：</strong>未登记的事实婚姻伴侣不是法定继承人</li>
                <li><strong>继子女：</strong>再婚对象的子女不是法定继承人（除非办理收养）</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 法定继承分 -->
        <section id="legal-shares" class="content-section">
          <h2>3. 法定继承份额</h2>
          
          <h3>继承份额表</h3>
          <div class="share-table">
            <div class="table-container">
              <table class="shares-table">
                <thead>
                  <tr>
                    <th>继承人组合</th>
                    <th>配偶者份额</th>
                    <th>血亲份额</th>
                    <th>具体分配</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>配偶者 + 子女</strong></td>
                    <td class="share-spouse">1/2</td>
                    <td class="share-relative">1/2</td>
                    <td>子女均分1/2</td>
                  </tr>
                  <tr>
                    <td><strong>配偶者 + 直系尊属</strong></td>
                    <td class="share-spouse">2/3</td>
                    <td class="share-relative">1/3</td>
                    <td>父母均分1/3</td>
                  </tr>
                  <tr>
                    <td><strong>配偶者 + 兄弟姐妹</strong></td>
                    <td class="share-spouse">3/4</td>
                    <td class="share-relative">1/4</td>
                    <td>兄弟姐妹均分1/4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>计算案例</h3>
          <div class="calculation-examples">
            <div class="example-item">
              <h4>案例1：配偶者和2名子女</h4>
              <div class="calculation-steps">
                <div class="step">配偶者：1/2</div>
                <div class="step">子女合计：1/2</div>
                <div class="step">每名子女：1/2 ÷ 2 = 1/4</div>
              </div>
            </div>
            <div class="example-item">
              <h4>案例2：只有子女（无配偶者）</h4>
              <div class="calculation-steps">
                <div class="step">子女均分全部遗产</div>
                <div class="step">2名子女：每人1/2</div>
                <div class="step">3名子女：每人1/3</div>
              </div>
            </div>
            <div class="example-item">
              <h4>案例3：配偶者和父母</h4>
              <div class="calculation-steps">
                <div class="step">配偶者：2/3</div>
                <div class="step">父母合计：1/3</div>
                <div class="step">每名父母：1/3 ÷ 2 = 1/6</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 继承的承认与放弃 -->
        <section id="acceptance-renunciation" class="content-section">
          <h2>4. 继承的承认与放弃</h2>
          
          <h3>三种选择</h3>
          <div class="inheritance-choices">
            <div class="choice-item">
              <div class="choice-icon">✅</div>
              <div class="choice-content">
                <h4>单纯承认</h4>
                <p><strong>接受全部遗产和债务</strong></p>
                <p>无限责任：用自己财产偿还超出遗产的债务</p>
                <div class="choice-note">3个月内未选择其他方式，视为单纯承认</div>
              </div>
            </div>
            <div class="choice-item">
              <div class="choice-icon">⚖️</div>
              <div class="choice-content">
                <h4>限定承认</h4>
                <p><strong>以继承所得遗产为限偿还债务</strong></p>
                <p>有限责任：只用在继承财产范围内偿还债务</p>
                <div class="choice-note warning">必须全体继承人共同选择</div>
              </div>
            </div>
            <div class="choice-item">
              <div class="choice-icon">❌</div>
              <div class="choice-content">
                <h4>继承放弃</h4>
                <p><strong>不接受任何遗产和债务</strong></p>
                <p>视为从一开始就不是继承人</p>
                <div class="choice-note">放弃后其子女不能代袭继承</div>
              </div>
            </div>
          </div>

          <h3>重要时间限制</h3>
          <div class="time-limits">
            <div class="time-limit-item">
              <h4>⏰ 3个月期限</h4>
              <p>从<strong>知道自己成为继承人时</strong>起3个月内必须向家庭裁判所申述选择</p>
              <p class="time-note">不是从被继承人死亡时起算！</p>
            </div>
          </div>
        </section>

        <!-- 代袭继承 -->
        <section id="substitution" class="content-section">
          <h2>5. 代袭继承</h2>
          
          <h3>代袭继承的概念</h3>
          <div class="substitution-concept">
            <p>当本应成为继承人的人在被继承人死亡前已经死亡，或因欠格、废除而不能继承时，由其子女代位继承。</p>
            
            <div class="example-box">
              <h4>📝 代袭继承案例</h4>
              <p>A死亡，其儿子B在A之前已死亡。B有子女C和D。此时C和D可以代袭B的继承权，继承本应由B继承的份额。</p>
            </div>
          </div>

          <h3>代袭继承的条件</h3>
          <div class="substitution-conditions">
            <div class="condition-item">
              <div class="condition-icon">💀</div>
              <div class="condition-content">
                <h4>死亡</h4>
                <p>继承人在继承开始前死亡</p>
                <div class="condition-status can-substitute">可以代袭</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">🚫</div>
              <div class="condition-content">
                <h4>欠格</h4>
                <p>因杀害被继承人等事由丧失继承资格</p>
                <div class="condition-status can-substitute">可以代袭</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">⚖️</div>
              <div class="condition-content">
                <h4>废除</h4>
                <p>因虐待等事由被家庭裁判所废除继承权</p>
                <div class="condition-status can-substitute">可以代袭</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">🙅</div>
              <div class="condition-content">
                <h4>继承放弃</h4>
                <p>继承人主动放弃继承权</p>
                <div class="condition-status cannot-substitute">不能代袭</div>
              </div>
            </div>
          </div>

          <h3>代袭的限制</h3>
          <div class="substitution-limits">
            <div class="limit-item">
              <h4>兄弟姐妹的代袭</h4>
              <p>兄弟姐妹的子女（侄子侄女）可以代袭，但<strong>侄子侄女的子女不能再代袭</strong>。</p>
            </div>
            <div class="limit-item">
              <h4>子女的代袭</h4>
              <p>子女的子女（孙子女）可以代袭，孙子女的子女（曾孙子女）也可以再代袭，没有代袭次数限制。</p>
            </div>
          </div>
        </section>

        <!-- 遗嘱 -->
        <section id="testament" class="content-section">
          <h2>6. 遗嘱</h2>
          
          <h3>遗嘱的能力和特征</h3>
          <div class="testament-basics">
            <div class="basic-item">
              <h4>遗嘱能力</h4>
              <ul>
                <li><strong>满15岁</strong>即可立遗嘱（不需要父母同意）</li>
                <li>成年被后见人在意识清醒时，有2名以上医师在场可立遗嘱</li>
                <li>被保佑人、被辅助人可以单独立遗嘱</li>
              </ul>
            </div>
            <div class="basic-item">
              <h4>遗嘱特征</h4>
              <ul>
                <li><strong>单独行为：</strong>1份遗嘱只能有1个人的意思表示</li>
                <li><strong>撤回自由：</strong>随时可以撤回或变更遗嘱</li>
                <li><strong>后法优先：</strong>前后遗嘱冲突时，以后立的遗嘱为准</li>
              </ul>
            </div>
          </div>

          <h3>遗嘱的形式</h3>
          <div class="testament-forms">
            <div class="table-container">
              <table class="forms-table">
                <thead>
                  <tr>
                    <th>形式</th>
                    <th>自笔证书遗嘱</th>
                    <th>公正证书遗嘱</th>
                    <th>秘密证书遗嘱</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>作成方法</strong></td>
                    <td>全文自笔（财产目录可打印）</td>
                    <td>公证人笔录口述</td>
                    <td>自笔或打印后密封</td>
                  </tr>
                  <tr>
                    <td><strong>证人</strong></td>
                    <td>不需要</td>
                    <td>2人以上</td>
                    <td>公证人1人+证人2人</td>
                  </tr>
                  <tr>
                    <td><strong>检认</strong></td>
                    <td class="required">原则上需要</td>
                    <td class="not-required">不需要</td>
                    <td class="required">需要</td>
                  </tr>
                  <tr>
                    <td><strong>优点</strong></td>
                    <td>费用低、方便</td>
                    <td>安全性高、执行力强</td>
                    <td>内容保密</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>遗嘱的撤回</h3>
          <div class="testament-revocation">
            <div class="revocation-methods">
              <div class="method-item">
                <h4>1. 生前处分</h4>
                <p>遗嘱后生前处分与遗嘱内容相抵触的财产，视为撤回该部分遗嘱</p>
              </div>
              <div class="method-item">
                <h4>2. 新遗嘱</h4>
                <p>立新遗嘱时，与旧遗嘱抵触的部分以新遗嘱为准</p>
              </div>
              <div class="method-item">
                <h4>3. 故意毁弃</h4>
                <p>故意毁弃遗嘱，视为撤回遗嘱</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 遗留分 -->
        <section id="legal-share" class="content-section">
          <h2>7. 遗留分</h2>
          
          <h3>遗留分的概念</h3>
          <div class="legal-share-concept">
            <p>为保障近亲属的基本生活，法律规定被继承人不得通过遗嘱完全剥夺特定继承人的最低继承份额。</p>
            
            <div class="example-box">
              <h4>📝 遗留分案例</h4>
              <p>A通过遗嘱将全部财产赠与情人D，但A有配偶者B和子女C。此时B和C可以行使遗留分侵害请求权，要求D支付相当于其遗留分份额的金钱。</p>
            </div>
          </div>

          <h3>遗留分的比例</h3>
          <div class="legal-share-rates">
            <div class="rate-item">
              <h4>基本原则</h4>
              <p>被继承人财产的<strong>1/2</strong>作为遗留分总额</p>
            </div>
            <div class="rate-item">
              <h4>直系尊属单独继承</h4>
              <p>只有直系尊属是继承人时，遗留分为财产的<strong>1/3</strong></p>
            </div>
            <div class="rate-item">
              <h4>兄弟姐妹</h4>
              <p class="no-share">兄弟姐妹<strong>没有遗留分</strong></p>
            </div>
          </div>

          <h3>遗留分侵害请求权</h3>
          <div class="legal-share-claim">
            <div class="claim-details">
              <div class="detail-item">
                <h4>权利性质</h4>
                <p>遗留分被侵害的继承人可以向受遗赠人或受赠人请求支付相当于遗留分侵害额的<strong>金钱</strong></p>
              </div>
              <div class="detail-item">
                <h4>消灭时效</h4>
                <ul>
                  <li>自知悉侵害事实时起<strong>1年</strong></li>
                  <li>自继承开始时起<strong>10年</strong></li>
                </ul>
              </div>
              <div class="detail-item">
                <h4>遗留分放弃</h4>
                <p>可以在继承开始前放弃遗留分，但需要<strong>家庭裁判所的许可</strong></p>
              </div>
            </div>
          </div>
        </section>

        <!-- 配偶者居住权 -->
        <section id="spouse-residence" class="content-section">
          <h2>8. 配偶者居住权</h2>
          
          <h3>制度的必要性</h3>
          <div class="residence-necessity">
            <div class="necessity-scenario">
              <h4>现实问题</h4>
              <p>老头子A死亡，留下房产（价值2000万）和存款（1000万）。继承人有妻子B和儿子C。</p>
              <div class="problem">
                <p>如果B要继承房产，就只能放弃大部分存款，生活困难。</p>
                <p>如果卖掉房产分钱，B就无家可归。</p>
              </div>
            </div>
          </div>

          <h3>配偶者居住权的解决方案</h3>
          <div class="residence-solution">
            <div class="solution-steps">
              <div class="solution-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>权利分割</h4>
                  <p>将房产权利分割为<strong>所有权</strong>和<strong>居住权</strong></p>
                </div>
              </div>
              <div class="solution-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>权利分配</h4>
                  <p>B取得居住权（评价额1000万），C取得附带居住权的所有权（评价额1000万）</p>
                </div>
              </div>
              <div class="solution-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>公平分割</h4>
                  <p>B再取得500万存款，C取得500万存款，双方各得1500万</p>
                </div>
              </div>
            </div>
            <div class="solution-result">
              <p><strong>结果：</strong>B可以终身无偿居住，C在B死后取得完整所有权，存款分配公平。</p>
            </div>
          </div>

          <h3>两种居住权的比较</h3>
          <div class="residence-comparison">
            <div class="table-container">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>配偶者居住权</th>
                    <th>配偶者短期居住权</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>费用</strong></td>
                    <td>无偿</td>
                    <td>无偿</td>
                  </tr>
                  <tr>
                    <td><strong>适用范围</strong></td>
                    <td>居住建物全部</td>
                    <td>居住建物的全部或一部</td>
                  </tr>
                  <tr>
                    <td><strong>存续期间</strong></td>
                    <td>原则终身</td>
                    <td>一定短期期间（最长6个月）</td>
                  </tr>
                  <tr>
                    <td><strong>权利内容</strong></td>
                    <td>使用、收益</td>
                    <td>使用</td>
                  </tr>
                  <tr>
                    <td><strong>对抗要件</strong></td>
                    <td>登记</td>
                    <td>不可对抗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>配偶者居住权的限制</h3>
          <div class="residence-limits">
            <div class="limit-item">
              <h4>🚫 不能成立的情况</h4>
              <ul>
                <li>房屋为被继承人与他人共有</li>
                <li>配偶者居住权<strong>不能让渡、不能继承</strong></li>
                <li>出租房屋需要所有权人同意</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 练习题 -->
        <section id="quiz" class="quiz-section">
          <h2>✍️ 练习题</h2>
          
          <div 
            v-for="(quiz, index) in quizzes" 
            :key="index"
            class="quiz-item"
          >
            <div class="quiz-question">{{ quiz.question }}</div>
            <div class="quiz-options">
              <div 
                v-for="option in quiz.options" 
                :key="option.text"
                class="quiz-option"
                :class="{ 
                  'selected': selectedAnswers[index] === option.text,
                  'correct': showAnswers && option.correct,
                  'incorrect': showAnswers && selectedAnswers[index] === option.text && !option.correct
                }"
                @click="selectAnswer(index, option.text)"
              >
                {{ option.text }}
              </div>
            </div>
            <div class="quiz-actions">
              <button class="answer-btn" @click="toggleAnswer(index)">
                {{ showAnswerIndex === index ? '隐藏答案' : '显示答案' }}
              </button>
            </div>
            <div 
              v-if="showAnswerIndex === index" 
              class="answer-explanation"
            >
              <strong>答案：</strong> {{ getCorrectAnswer(quiz) }}<br>
              <strong>中文解释：</strong> {{ quiz.explanation }}
            </div>
          </div>

          <div class="quiz-footer-actions">
            <button class="btn btn-primary" @click="checkAllAnswers">
              检查全部答案
            </button>
            <button class="btn btn-outline" @click="resetQuiz">
              重新练习
            </button>
          </div>
        </section>

        <!-- 底部行动按钮 -->
        <div class="action-buttons">
          <router-link to="/video?topic=succession" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=succession" class="action-button">
            <span>📝</span>
            开始强化练习
          </router-link>
          <router-link to="/notes?domain=rights" class="action-button">
            <span>📚</span>
            返回权利关系
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLearningStore } from '@/stores/learning'
import { useRouter } from 'vue-router'

const learningStore = useLearningStore()
const router = useRouter()

// 用户学习进度
const userProgress = ref(0)
const startTime = ref(new Date())

// 页面章节导航
const sections = [
  { id: 'key-terms', title: '关键术语', icon: '🔤' },
  { id: 'basic-concepts', title: '基本概念', icon: '📖' },
  { id: 'legal-heirs', title: '法定继承人', icon: '👥' },
  { id: 'legal-shares', title: '法定继承分', icon: '📊' },
  { id: 'acceptance-renunciation', title: '承认与放弃', icon: '⚖️' },
  { id: 'substitution', title: '代袭继承', icon: '🔁' },
  { id: 'testament', title: '遗嘱', icon: '📜' },
  { id: 'legal-share', title: '遗留分', icon: '🛡️' },
  { id: 'spouse-residence', title: '配偶者居住权', icon: '🏠' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '相続（そうぞく）',
    chinese: '继承',
    explanation: '被继承人死亡后，其权利义务由继承人概括承受的法律制度',
    example: 'A死亡后，其财产和债务由子女B和C继承'
  },
  {
    japanese: '法定相続人（ほうていそうぞくにん）',
    chinese: '法定继承人',
    explanation: '法律规定的有权继承遗产的人，按顺序包括配偶、子女、父母、兄弟姐妹',
    example: '配偶者常备继承人，与第一顺位子女、第二顺位父母或第三顺位兄弟姐妹共同继承'
  },
  {
    japanese: '遺留分（いりゅうぶん）',
    chinese: '遗留分',
    explanation: '为保障近亲属生活，法律规定被继承人不得通过遗嘱完全剥夺的最低继承份额',
    example: '即使遗嘱将全部财产给情人，配偶和子女仍可请求相当于遗留分份额的金钱'
  },
  {
    japanese: '配偶者居住権（はいぐうしゃきょじゅうけん）',
    chinese: '配偶者居住权',
    explanation: '保障配偶在继承开始后能够继续在原有住宅中居住的权利',
    example: '老头子死亡后，老太太可以终身无偿居住在原有房屋中'
  },
  {
    japanese: '代襲相続（だいしゅうそうぞく）',
    chinese: '代袭继承',
    explanation: '当本应继承的人先于被继承人死亡或因欠格、废除不能继承时，由其子女代位继承',
    example: '儿子先于父亲死亡，孙子可以代位继承儿子的应继份'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '被相続人の子が、相続の開始後に相続放棄をした場合、その者の子がこれを代襲して相続人となる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '继承放弃的情况下，放弃人的子女不能代袭继承。只有因死亡、欠格、废除不能继承时才能代袭。'
  },
  {
    question: '甲建物を所有するAが死亡し、相続人がそれぞれAの子であるB及びCの2名である場合に関して、Cが単純承認をしたときは、Bは限定承認をすることができない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '限定承认必须由全体继承人共同选择，如果其中一人已选择单纯承认，其他人就不能选择限定承认。'
  },
  {
    question: '満15歳に達した者は、父母の同意を得なくても、遺言をすることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '年满15岁即可立遗嘱，不需要父母同意。这是遗嘱能力的特殊规定。'
  },
  {
    question: '夫婦又は血縁関係がある者は、同一の証書で有効に遺言をすることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '遗嘱是单独行为，1份遗嘱只能有1个人的意思表示，夫妻或血亲不能在同一份遗嘱中共同立遗嘱。'
  },
  {
    question: '被相続人Aの配偶者BとAの弟Cのみが相続人であり、Aが他人Dに遺産全部を遺贈したとき、Bの遺留分は遺産の8分の3、Cの遺留分は遺産の8分の1である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '兄弟姐妹没有遗留分。此案例中只有配偶者B有遗留分，为遗产的1/2（配偶者3/4 × 遗留分1/2 = 3/8），弟弟C没有遗留分。'
  }
]

// 答题状态
const selectedAnswers = ref(Array(quizzes.length).fill(null))
const showAnswerIndex = ref(null)
const showAnswers = ref(false)

// 方法
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const selectAnswer = (index, answer) => {
  selectedAnswers.value[index] = answer
  // 更新学习进度
  updateProgress()
}

const toggleAnswer = (index) => {
  showAnswerIndex.value = showAnswerIndex.value === index ? null : index
}

const getCorrectAnswer = (quiz) => {
  const correctOption = quiz.options.find(option => option.correct)
  return correctOption ? correctOption.text : ''
}

const checkAllAnswers = () => {
  showAnswers.value = true
  updateProgress()
}

const resetQuiz = () => {
  selectedAnswers.value = Array(quizzes.length).fill(null)
  showAnswers.value = false
  showAnswerIndex.value = null
  userProgress.value = 0
}

const updateProgress = () => {
  const total = quizzes.length
  const correct = quizzes.reduce((count, quiz, index) => {
    const selected = selectedAnswers.value[index]
    if (!selected) return count
    
    const isCorrect = quiz.options.find(opt => opt.text === selected)?.correct || false
    return count + (isCorrect ? 1 : 0)
  }, 0)
  
  userProgress.value = Math.round((correct / total) * 100)
}

// 记录学习时间
const recordStudyTime = () => {
  const currentTime = new Date()
  const studyTime = Math.floor((currentTime - startTime.value) / 1000) // 转换为秒
  learningStore.recordTopicStudyTime('succession', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('succession')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('succession')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('succession', 0)
  
  // 设置定时器，每30秒记录一次学习时间
  const timer = setInterval(() => {
    recordStudyTime()
  }, 30000)
  
  onUnmounted(() => {
    clearInterval(timer)
    // 组件卸载时记录总学习时间
    recordStudyTime()
  })
})
</script>

<style scoped>
.succession-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0 2rem;
  text-align: center;
}

.breadcrumb {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.breadcrumb a {
  color: #2a7960;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.header-content h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #1a472a;
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: #6c757d;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2a7960;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 2rem 0;
}

/* ========= 快速导航 ========= */
.quick-nav {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.quick-nav h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a472a;
  margin-bottom: 1rem;
}

.nav-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
}

.nav-link:hover {
  background: #e9ecef;
  color: #1a472a;
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.125rem;
}

/* ========= 学习目标 ========= */
.learning-goals {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.learning-goals h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a472a;
  margin-bottom: 1.5rem;
}

.learning-goals ul {
  padding-left: 1.5rem;
}

.learning-goals li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

/* ========= 关键术语 ========= */
.key-terms {
  margin-bottom: 2rem;
}

.key-terms h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a472a;
  margin-bottom: 1.5rem;
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.term-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #2a7960;
}

.term-japanese {
  font-weight: bold;
  color: #2a7960;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.term-chinese {
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.term-explanation {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.term-example {
  background: #eef7ff;
  padding: 1rem;
  border-radius: 5px;
  font-style: italic;
  border-left: 3px solid #a8c6ff;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 内容区块 ========= */
.content-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.content-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a472a;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.content-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a472a;
  margin: 1.5rem 0 1rem;
}

.content-section p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.content-section ul, .content-section ol {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.content-section li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 基本概念样式 ========= */
.concept-explanation {
  margin-bottom: 2rem;
}

.example-box {
  background: #f0f7ff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 4px solid #2a7960;
}

.example-box h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.effect-timing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.timing-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.timing-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.timing-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.timing-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 法定继承人样式 ========= */
.heir-order {
  margin-bottom: 2rem;
}

.order-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.flow-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.step-content p {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.step-note {
  padding: 0.5rem;
  background: #e9f7f0;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #2a7960;
  font-weight: bold;
}

.important-notes {
  margin: 1.5rem 0;
}

.note-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.note-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.note-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.note-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 法定继承份额样式 ========= */
.share-table {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
}

.shares-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.shares-table th, .shares-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.shares-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.shares-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.share-spouse {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.share-relative {
  background-color: #eef7ff !important;
  color: #1565c0;
  font-weight: bold;
}

.calculation-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.example-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.example-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.calculation-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* ========= 继承承认与放弃样式 ========= */
.inheritance-choices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.choice-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.choice-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.choice-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.choice-content p {
  margin: 0.25rem 0;
}

.choice-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.choice-note.warning {
  background: #fff9e6;
  border-left: 3px solid #ffcc00;
}

.time-limits {
  margin: 2rem 0;
}

.time-limit-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.time-limit-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
}

/* ========= 代袭继承样式 ========= */
.substitution-concept {
  margin-bottom: 2rem;
}

.substitution-conditions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.condition-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.condition-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.condition-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.condition-content p {
  margin: 0;
  color: #6c757d;
}

.condition-status {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
}

.condition-status.can-substitute {
  background: #e7f7e7;
  color: #2e7d32;
}

.condition-status.cannot-substitute {
  background: #ffe7e7;
  color: #c62828;
}

.substitution-limits {
  margin: 2rem 0;
}

.limit-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.limit-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 遗嘱样式 ========= */
.testament-basics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.basic-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.basic-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.basic-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.basic-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.testament-forms {
  margin: 2rem 0;
}

.forms-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.forms-table th, .forms-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.forms-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.forms-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.required {
  background-color: #fff9e6 !important;
  color: #e65100;
  font-weight: bold;
}

.not-required {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.testament-revocation {
  margin: 2rem 0;
}

.revocation-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.method-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.method-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 遗留分样式 ========= */
.legal-share-concept {
  margin-bottom: 2rem;
}

.legal-share-rates {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rate-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.rate-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.rate-item p {
  margin: 0;
  font-weight: bold;
}

.no-share {
  color: #c62828 !important;
}

.legal-share-claim {
  margin: 2rem 0;
}

.claim-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.detail-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.detail-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.detail-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 配偶者居住权样式 ========= */
.residence-necessity {
  margin-bottom: 2rem;
}

.necessity-scenario {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.necessity-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.problem {
  margin-top: 1rem;
  padding: 1rem;
  background: #ffe7e7;
  border-radius: 4px;
}

.residence-solution {
  margin: 2rem 0;
}

.solution-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.solution-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.solution-step .step-number {
  width: 40px;
  height: 40px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.solution-step h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.solution-result {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

.residence-comparison {
  margin: 2rem 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th, .comparison-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.comparison-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.comparison-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.residence-limits {
  margin: 2rem 0;
}

/* ========= 练习题样式 ========= */
.quiz-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.quiz-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a472a;
  margin-bottom: 1.5rem;
}

.quiz-item {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.quiz-question {
  font-weight: bold;
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
  line-height: 1.5;
}

.quiz-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.quiz-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;
  background: white;
  min-width: 120px;
  justify-content: center;
}

.quiz-option:hover {
  background: #f0f0f0;
}

.quiz-option.selected {
  border-color: #2a7960;
  background: #e9f7f0;
}

.quiz-option.correct {
  border-color: #28a745;
  background: #e7f7e7;
  color: #2e7d32;
}

.quiz-option.incorrect {
  border-color: #dc3545;
  background: #ffe7e7;
  color: #c62828;
}

.quiz-actions {
  margin-bottom: 1rem;
}

.answer-btn {
  background: #2a7960;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

.answer-btn:hover {
  background: #1a472a;
}

.answer-explanation {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 5px;
  line-height: 1.6;
}

.quiz-footer-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

/* ========= 按钮样式 ========= */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #2a7960;
  color: white;
}

.btn-primary:hover {
  background: #1a472a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-outline {
  background: transparent;
  color: #2a7960;
  border: 1px solid #2a7960;
}

.btn-outline:hover {
  background: #e9f7f0;
  transform: translateY(-2px);
}

/* ========= 底部行动按钮 ========= */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #2a7960, #1a472a);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.action-button.video {
  background: linear-gradient(135deg, #2a7960, #205e4a);
}

/* ========= 响应式设计 ========= */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 1.5rem 1rem;
  }
  
  .header-content h1 {
    font-size: 1.75rem;
  }
  
  .header-stats {
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .nav-links {
    grid-template-columns: 1fr;
  }
  
  .terms-grid {
    grid-template-columns: 1fr;
  }
  
  .effect-timing {
    grid-template-columns: 1fr;
  }
  
  .order-flow {
    grid-template-columns: 1fr;
  }
  
  .calculation-examples {
    grid-template-columns: 1fr;
  }
  
  .inheritance-choices {
    grid-template-columns: 1fr;
  }
  
  .substitution-conditions {
    grid-template-columns: 1fr;
  }
  
  .testament-basics {
    grid-template-columns: 1fr;
  }
  
  .legal-share-rates {
    grid-template-columns: 1fr;
  }
  
  .claim-details {
    grid-template-columns: 1fr;
  }
  
  .solution-steps {
    grid-template-columns: 1fr;
  }
  
  .quiz-options {
    flex-direction: column;
  }
  
  .quiz-option {
    min-width: auto;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .content-section, 
  .learning-goals, 
  .quiz-section, 
  .quick-nav {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .quiz-footer-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>