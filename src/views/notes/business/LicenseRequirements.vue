<!-- src/views/notes/yefa/LicenseRequirements.vue -->
<template>
  <div class="license-requirements">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>免许制度</span>
        </div>
        <h1>免许制度</h1>
        <p>宅建业法中关于免许种类、申请条件、欠格事由及2025年最新法改正的完整解析</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">16</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">40分钟</span>
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
          <h2>📚 学习目标</h2>
          <ul>
            <li>理解宅建业免许的种类、申请条件和效力范围</li>
            <li>掌握免许权者的区分标准及申请流程（含2025年法改正）</li>
            <li>熟悉免许的欠格事由和更新要求</li>
            <li>了解免许取消、返纳和更换的具体规定</li>
            <li>能够区分需要免许和不需要免许的特殊情况</li>
          </ul>
        </section>

        <!-- 关键术语 -->
        <section id="key-terms" class="key-terms">
          <h2>🧑‍⚖️ 关键术语</h2>
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

        <!-- 免许的种类与申请权者 -->
        <section id="license-types" class="content-section">
          <h2>1. 免许的种类与申请权者</h2>
          
          <h3>免许的两种类型</h3>
          <div class="license-types-diagram">
            <div class="license-type">
              <div class="type-header">国土交通大臣免许</div>
              <div class="type-content">
                <div class="type-condition">2个以上都道府县设置事务所时</div>
                <div class="type-authority">颁发机关：国土交通大臣</div>
              </div>
            </div>
            <div class="license-type">
              <div class="type-header">都道府县知事免许</div>
              <div class="type-content">
                <div class="type-condition">仅在1个都道府县内设置事务所时</div>
                <div class="type-authority">颁发机关：都道府县知事</div>
              </div>
            </div>
          </div>

          <h3>判断标准与实务案例</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>案例场景</th>
                  <th>事务所分布</th>
                  <th>免许种类</th>
                  <th>判断理由</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>案例1</strong></td>
                  <td>东京1个事务所</td>
                  <td class="required">东京都知事免许</td>
                  <td>仅在1个都道府县内</td>
                </tr>
                <tr>
                  <td><strong>案例2</strong></td>
                  <td>东京和大阪各1个事务所</td>
                  <td class="required">国土交通大臣免许</td>
                  <td>跨2个都道府县</td>
                </tr>
                <tr>
                  <td><strong>案例3</strong></td>
                  <td>东京本店（建设业）+ 大阪支店（宅建业）</td>
                  <td class="required">国土交通大臣免许</td>
                  <td>本店无论业务内容都计入事务所数量</td>
                </tr>
                <tr>
                  <td><strong>案例4</strong></td>
                  <td>东京本店（宅建业）+ 大阪支店（美容业）</td>
                  <td class="required">东京都知事免许</td>
                  <td>支店只有从事宅建业时才计入</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="highlight-box">
            <strong>重要原则：</strong>
            <ul>
              <li>仅根据<strong>事务所所在地</strong>判断，不考虑业务内容</li>
              <li><strong>本店</strong>无论是否从事宅建业都计入事务所数量</li>
              <li><strong>支店</strong>只有从事宅建业时才计入事务所数量</li>
            </ul>
          </div>
        </section>

        <!-- 免许的申请流程（2025年法改正） -->
        <section id="application-process" class="content-section">
          <h2>2. 免许的申请流程（2025年法改正）</h2>
          
          <h3>申请方式对比</h3>
          <div class="reform-comparison">
            <div class="reform-before">
              <h4>改正前</h4>
              <div class="process-flow">
                <div class="process-step">申请者</div>
                <div class="process-arrow">→</div>
                <div class="process-step">都道府县知事（经由）</div>
                <div class="process-arrow">→</div>
                <div class="process-step">国土交通大臣</div>
              </div>
            </div>
            <div class="reform-after">
              <h4>改正后（2025年）</h4>
              <div class="process-flow">
                <div class="process-step">申请者</div>
                <div class="process-arrow">→</div>
                <div class="process-step highlight-step">直接申请</div>
                <div class="process-arrow">→</div>
                <div class="process-step">国土交通大臣（地方整备局）</div>
              </div>
            </div>
          </div>

          <div class="highlight-box">
            <strong>2025年法改正要点：</strong>
            <ul>
              <li>国土交通大臣免许申请<strong>不再经由都道府县知事</strong></li>
              <li>改为<strong>直接向地方整备局</strong>申请[citation:1][citation:7]</li>
              <li>支持<strong>在线申请（eMLIT系统）</strong>[citation:7]</li>
              <li>手续简化，处理效率提高</li>
            </ul>
          </div>

          <h3>申请书记载事项</h3>
          <ul>
            <li><strong>必须记载</strong>：法人役员姓名（包括非常勤役员）、政令使用人姓名</li>
            <li><strong>不需要记载</strong>：役员和政令使用人的住所</li>
            <li><strong>添付书类简化</strong>：专任宅建士的身分证明书等提交义务废止[citation:7]</li>
          </ul>

          <h3>特殊申请人规定</h3>
          <div class="case-scenario">
            <strong>未成年人申请案例：</strong>
            16岁的小王得到法定代理人（父亲）的营业许可，获得5亿人民币资金来日本开设不动产公司。<br>
            <strong>判断：</strong>小王属于<strong>"有营业能力的未成年人"</strong>，可以申请宅建业免许。
          </div>
        </section>

        <!-- 欠格事由详解 -->
        <section id="disqualification" class="content-section">
          <h2>3. 欠格事由详解</h2>
          
          <h3>个人欠格事由</h3>
          <div class="disqualification-grid">
            <div class="disqualification-item">
              <div class="disqualification-icon">🚫</div>
              <div class="disqualification-content">
                <h4>破产未复权者</h4>
                <p>复权后<strong>立即</strong>可申请，不需要等待5年</p>
              </div>
            </div>
            <div class="disqualification-item">
              <div class="disqualification-icon">🚫</div>
              <div class="disqualification-content">
                <h4>身心障碍者</h4>
                <p>个别审查，不一律排除（如成年被后见人）</p>
              </div>
            </div>
            <div class="disqualification-item">
              <div class="disqualification-icon">🚫</div>
              <div class="disqualification-content">
                <h4>刑罚受刑者</h4>
                <p>根据犯罪类型和刑罚有不同限制期间</p>
              </div>
            </div>
          </div>

          <h3>刑罚类型与免许限制</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>刑罚类型</th>
                  <th>犯罪性质</th>
                  <th>免许限制期间</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>拘留/科料</strong></td>
                  <td>任何犯罪</td>
                  <td class="required">可申请</td>
                  <td>无限制</td>
                </tr>
                <tr>
                  <td><strong>罚金刑</strong></td>
                  <td>宅建业法违反・背任・暴力犯罪</td>
                  <td class="not-required">刑执行后5年内不可</td>
                  <td>特定犯罪</td>
                </tr>
                <tr>
                  <td><strong>禁锢刑</strong></td>
                  <td>任何犯罪</td>
                  <td class="not-required">刑执行后5年内不可</td>
                  <td>所有禁锢刑都受限</td>
                </tr>
                <tr>
                  <td><strong>执行犹予</strong></td>
                  <td>任何犯罪</td>
                  <td class="not-required">执行犹予期间中不可</td>
                  <td>期间满了后次日可申请</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>暴力犯罪范围</h3>
          <div class="two-column-list">
            <div class="column">
              <h4>包含的犯罪：</h4>
              <ul>
                <li>暴行罪、伤害罪</li>
                <li>伤害现场助势罪</li>
                <li>胁迫罪</li>
                <li>凶器准备集合罪</li>
                <li>违反暴力团防止法</li>
              </ul>
            </div>
            <div class="column">
              <h4>不包含的犯罪：</h4>
              <ul>
                <li>过失致死</li>
                <li>过失伤害</li>
                <li>器物损坏</li>
                <li>违反道路交通法</li>
              </ul>
            </div>
          </div>

          <h3>法人相关欠格事由</h3>
          <div class="case-scenario">
            <strong>"三恶"事由（免许取消后5年内不可）：</strong>
            <ol>
              <li><strong>不正当手段取得免许</strong></li>
              <li><strong>业务停止处分情节特别严重</strong></li>
              <li><strong>违反业务停止处分</strong></li>
            </ol>
          </div>
        </section>

        <!-- 免许的效力与特征 -->
        <section id="license-effects" class="content-section">
          <h2>4. 免许的效力与特征</h2>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">⏱️</div>
              <h3>有效期</h3>
              <p><strong>5年</strong></p>
              <p>期满前90-30天内申请更新</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🗺️</div>
              <h3>效力范围</h3>
              <p><strong>全国有效</strong></p>
              <p>知事免许也可在其他都道府县营业</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>更新期间</h3>
              <p><strong>旧免许继续有效</strong></p>
              <p>更新申请期间可继续营业</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📄</div>
              <h3>免许证</h3>
              <p><strong>不需返纳</strong></p>
              <p>有效期满后不需要归还</p>
            </div>
          </div>

          <div class="highlight-box">
            <strong>重要原则：名义借出禁止</strong>
            <p>不得将自己的宅建业者免许借给其他公司使用，违者将受处罚。</p>
          </div>
        </section>

        <!-- 免许不需要的特殊情况 -->
        <section id="license-exemptions" class="content-section">
          <h2>5. 免许不需要的特殊情况</h2>
          
          <h3>完全不需要免许</h3>
          <ul>
            <li><strong>国家、地方公共团体</strong></li>
            <li><strong>独立行政法人</strong></li>
            <li><strong>地方住宅供给公社</strong></li>
            <li><strong>破产管财人</strong></li>
          </ul>

          <h3>免许不需要但需届出</h3>
          <div class="exemption-item">
            <h4>信托会社、信托银行</h4>
            <p><strong>需要向国土交通大臣届出</strong></p>
            <p class="exemption-reason">理由：信托法比宅建业法更严格（信托法 > 宅建业法）</p>
          </div>

          <h3>需要免许的例外</h3>
          <div class="exemption-item important">
            <h4>农业协同组合（农业协会）</h4>
            <p><strong>需要免许</strong> - 作为重要例外必须记忆</p>
          </div>
        </section>

        <!-- 免许的更新、返纳与更换 -->
        <section id="license-management" class="content-section">
          <h2>6. 免许的更新、返纳与更换</h2>
          
          <h3>更新时机与要求</h3>
          <div class="update-timeline">
            <div class="timeline-point">
              <div class="timeline-date">有效期满前90天</div>
              <div class="timeline-content">
                <strong>更新申请开始</strong>
              </div>
            </div>
            <div class="timeline-point">
              <div class="timeline-date">有效期满前30天</div>
              <div class="timeline-content">
                <strong>更新申请截止</strong>
              </div>
            </div>
            <div class="timeline-point">
              <div class="timeline-date">更新申请期间</div>
              <div class="timeline-content">
                <strong>旧免许继续有效</strong>，可继续营业
              </div>
            </div>
          </div>

          <h3>返纳情形（記憶口诀："换取亡废"）</h3>
          <div class="return-scenarios">
            <div class="scenario">
              <div class="scenario-icon">🔄</div>
              <div class="scenario-content">
                <h4>换</h4>
                <p>免许种类更换（如知事免许换大臣免许）</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">❌</div>
              <div class="scenario-content">
                <h4>取</h4>
                <p>免许被取消</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🔍</div>
              <div class="scenario-content">
                <h4>亡</h4>
                <p>免许丢失后找到旧的</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🏁</div>
              <div class="scenario-content">
                <h4>废</h4>
                <p>废业关张</p>
              </div>
            </div>
          </div>

          <h3>更换规则（免許換え）</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>更换类型</th>
                  <th>申请方式</th>
                  <th>记忆口诀</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>知事免许 → 大臣免许</strong></td>
                  <td>经由知事向大臣申请</td>
                  <td rowspan="2" class="memory-tip">"换大臣时经由<br>换知事时直接"</td>
                </tr>
                <tr>
                  <td><strong>大臣免许 → 知事免许</strong></td>
                  <td>直接向知事申请</td>
                </tr>
                <tr>
                  <td><strong>甲县知事免许 → 乙县知事免许</strong></td>
                  <td>直接向乙知事申请</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 免许的取消事由 -->
        <section id="license-cancellation" class="content-section">
          <h2>7. 免许的取消事由</h2>
          
          <h3>取消权者</h3>
          <ul>
            <li><strong>大臣免许</strong>：只有国土交通大臣可取消</li>
            <li><strong>知事免许</strong>：只有颁发知事可取消</li>
          </ul>

          <h3>主要取消事由</h3>
          <div class="cancellation-reasons">
            <div class="reason-category">
              <h4>不正当行为</h4>
              <ul>
                <li>通过不正当手段获得免许</li>
                <li>业务停止处分情节特别严重</li>
                <li>违反业务停止处分</li>
              </ul>
            </div>
            <div class="reason-category">
              <h4>刑罚相关</h4>
              <ul>
                <li>役员或政令使用人破产未复权</li>
                <li>役员或政令使用人被处禁锢刑以上</li>
                <li>役员或政令使用人因特定犯罪被处罚金刑</li>
              </ul>
            </div>
            <div class="reason-category">
              <h4>业务状态</h4>
              <ul>
                <li>取得免许后1年内未开业</li>
                <li>持续1年以上休业</li>
              </ul>
            </div>
          </div>

          <h3>特定犯罪范围</h3>
          <div class="highlight-box">
            <strong>暴力犯罪 + 背任罪 + 宅建业法违反</strong>
            <p>注意：违反道路交通法的罚金刑不会导致免许取消</p>
          </div>
        </section>

        <!-- 免许失效与届出义务 -->
        <section id="license-expiration" class="content-section">
          <h2>8. 免许失效与届出义务</h2>
          
          <h3>免许失效情形及届出责任人</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>失效情形</th>
                  <th>届出责任人</th>
                  <th>届出期限</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>宅建业者死亡</strong></td>
                  <td>继承人</td>
                  <td>知道死亡事实之日起30日内</td>
                </tr>
                <tr>
                  <td><strong>法人合并消减</strong></td>
                  <td>消减法人的代表役员</td>
                  <td>消减之日起30日内</td>
                </tr>
                <tr>
                  <td><strong>破产</strong></td>
                  <td>破产管财人</td>
                  <td>30日内</td>
                </tr>
                <tr>
                  <td><strong>废业</strong></td>
                  <td>本人或代表役员</td>
                  <td>30日内</td>
                </tr>
                <tr>
                  <td><strong>法人解散</strong></td>
                  <td>清算人</td>
                  <td>30日内</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>免许失效后的业务范围</h3>
          <div class="case-scenario">
            <strong>实务案例：</strong>
            宅建业免许在2024年1月20日失效，但1月20日之前已缔结租赁契约。<br>
            <strong>允许行为：</strong>为结束该已缔结交易范围内的宅建业行为<br>
            <strong>日文表述：</strong>【失効前に締結した契約に基づく取引を結了する範囲内】
          </div>

          <div class="highlight-box">
            <strong>免许失效后仍可进行的业务：</strong>
            <ul>
              <li>死亡宅建业者的继承人以结束之前交易为目的的行为</li>
              <li>被合并宅建业者以结束之前交易为目的的行为</li>
              <li>因免许取消、废业等失效后以结束之前交易为目的的行为</li>
            </ul>
          </div>
        </section>

        <!-- 2025年免许相关法改正总结 -->
        <section id="legal-reform" class="content-section">
          <h2>9. 2025年免许相关法改正总结</h2>
          
          <div class="reform-highlights">
            <div class="reform-item major">
              <div class="reform-icon">📝</div>
              <div class="reform-content">
                <h4>申请途径简化</h4>
                <p>国土交通大臣免许申请<strong>不再经由都道府县知事</strong>，改为直接向地方整备局申请[citation:1][citation:7]</p>
              </div>
            </div>
            <div class="reform-item major">
              <div class="reform-icon">🔒</div>
              <div class="reform-content">
                <h4>隐私保护强化</h4>
                <p>从业者名簿<strong>删除住所、生年月日、性别</strong>记载[citation:1][citation:9]</p>
              </div>
            </div>
            <div class="reform-item">
              <div class="reform-icon">🏷️</div>
              <div class="reform-content">
                <h4>标識记载变更</h4>
                <p>删除专任宅建士氏名，改为记载<strong>人数、事务所代表者氏名、从业者数</strong>[citation:1][citation:10]</p>
              </div>
            </div>
            <div class="reform-item">
              <div class="reform-icon">💻</div>
              <div class="reform-content">
                <h4>数字化推进</h4>
                <p>支持<strong>在线申请（eMLIT系统）</strong>，电子化手续[citation:7]</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 练习题 -->
        <section id="quiz" class="quiz-section">
          <h2>❓ 判断题</h2>
          
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
            <button class="answer-btn" @click="toggleAnswer(index)">
              {{ showAnswerIndex === index ? '隐藏答案' : '显示答案' }}
            </button>
            <div 
              v-if="showAnswerIndex === index" 
              class="answer-explanation"
            >
              <strong>答案：</strong> {{ getCorrectAnswer(quiz) }}<br>
              <strong>中文解释：</strong> {{ quiz.explanation }}
            </div>
          </div>

          <div class="quiz-actions">
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
          <router-link to="/video?topic=license-requirements" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=license-requirements" class="action-button">
            <span>📝</span>
            开始强化练习
          </router-link>
          <router-link to="/notes?domain=business" class="action-button">
            <span>📚</span>
            返回宅建业法
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
  { id: 'key-terms', title: '关键术语', icon: '🧑‍⚖️' },
  { id: 'license-types', title: '免许种类', icon: '📋' },
  { id: 'application-process', title: '申请流程', icon: '📝' },
  { id: 'disqualification', title: '欠格事由', icon: '🚫' },
  { id: 'license-effects', title: '免许效力', icon: '⚡' },
  { id: 'license-exemptions', title: '免许例外', icon: '🔄' },
  { id: 'license-management', title: '更新返纳', icon: '🔄' },
  { id: 'license-cancellation', title: '免许取消', icon: '❌' },
  { id: 'license-expiration', title: '免许失效', icon: '⏰' },
  { id: 'legal-reform', title: '法改正', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '免許（めんきょ）',
    chinese: '许可/执照',
    explanation: '从事宅建业的法定资格，类似营业执照，有效期5年',
    example: '无免许从事宅建业属于违法，将受处罚'
  },
  {
    japanese: '免許権者（めんきょけんしゃ）',
    chinese: '免许权者',
    explanation: '颁发免许的行政机关（都道府县知事或国土交通大臣）',
    example: '东京都知事免许的免许权者是东京都知事'
  },
  {
    japanese: '欠格事由（けっかくじゆう）',
    chinese: '欠格事由',
    explanation: '不具备申请免许资格的情况，如破产未复权、暴力团员等',
    example: '破产者复权后立即可以申请免许，不需要等待5年'
  },
  {
    japanese: '政令で定める使用人（せいれいでさだめるしようにん）',
    chinese: '政令使用人',
    explanation: '事务所的代表，具有契约缔结权限的使用人',
    example: '店长、支店长等具有契约权限的人员'
  },
  {
    japanese: '免許の更新（めんきょのこうしん）',
    chinese: '免许更新',
    explanation: '免许有效期届满前的续期手续，需在期满前90-30天内申请',
    example: '更新申请期间旧免许继续有效，可继续营业'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅建業の免許は、２以上の都道府県の区域内に事務所を設ける場合には、国土交通大臣の免許を受けなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '根据宅建业法，在2个以上都道府县设置事务所时必须取得国土交通大臣免许。'
  },
  {
    question: '未成年者は、営業に関して成年者と同一の行為能力を有する場合であっても、宅建業の免許を受けることができない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '有营业能力的未成年人（得到法定代理人许可）可以申请宅建业免许。'
  },
  {
    question: '免許を受けようとする法人の取締役が破産手続開始の決定を受けた場合、復権を得なければ免許を受けることができないが、復権を得た後は直ちに免許を受けることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '破产者复权后立即可以申请免许，不需要等待5年。'
  },
  {
    question: '宅建業の免許の有効期間は５年であり、その期間を経過したときは、免許証を免許権者に返納しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '免许证有效期满后不需要返纳，只需在期满前申请更新即可。'
  },
  {
    question: '信託会社が宅建業を営む場合には、免許は不要であるが、国土交通大臣への届出が必要である。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '信托公司从事宅建业免许不需要，但需向国土交通大臣届出。'
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
  learningStore.recordTopicStudyTime('license_requirements', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('license_requirements')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('license_requirements')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('license_requirements', 0)
  
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
.license-requirements {
  min-height: 100vh;
  background-color: var(--bg);
}

.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 2rem;
  margin: 1rem 0 2rem;
  text-align: center;
}

.breadcrumb {
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 1rem;
}

.breadcrumb a {
  color: var(--primary);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.header-content h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: var(--muted);
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
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 2rem 0;
}

/* ========= 快速导航 ========= */
.quick-nav {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.quick-nav h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
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
  background: var(--bg);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
}

.nav-link:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.125rem;
}

/* ========= 学习目标 ========= */
.learning-goals {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.learning-goals h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
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
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.term-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--primary);
}

.term-japanese {
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.term-chinese {
  font-weight: bold;
  color: var(--text);
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
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.content-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border);
}

.content-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
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

/* ========= 免许种类图示 ========= */
.license-types-diagram {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.license-type {
  border: 2px solid var(--primary);
  border-radius: var(--radius);
  overflow: hidden;
}

.type-header {
  background: var(--primary);
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.125rem;
}

.type-content {
  padding: 1.5rem;
  background: white;
}

.type-condition {
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.type-authority {
  color: var(--muted);
  font-size: 0.875rem;
}

/* ========= 法改正对比 ========= */
.reform-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.reform-before, .reform-after {
  padding: 1.5rem;
  border-radius: var(--radius);
}

.reform-before {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
}

.reform-after {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.reform-before h4, .reform-after h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
}

.process-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.process-step {
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 0.875rem;
}

.highlight-step {
  background: var(--primary-light);
  border-color: var(--primary);
  font-weight: 600;
}

.process-arrow {
  color: var(--muted);
  font-weight: bold;
}

/* ========= 欠格事由网格 ========= */
.disqualification-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.disqualification-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fff9e6;
  border-radius: var(--radius);
  border-left: 4px solid #ffcc00;
}

.disqualification-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.disqualification-content h4 {
  margin: 0 0 0.25rem 0;
  color: var(--primary-dark);
}

.disqualification-content p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 两栏列表 ========= */
.two-column-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;
}

.column h4 {
  margin-bottom: 0.75rem;
  color: var(--primary-dark);
}

.column ul {
  padding-left: 1.25rem;
}

.column li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* ========= 特性网格 ========= */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  text-align: center;
  padding: 1.5rem 1rem;
  background: var(--primary-light);
  border-radius: var(--radius);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-dark);
}

.feature-card p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 免许例外样式 ========= */
.exemption-item {
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f0f7ff;
  border-radius: var(--radius);
  border-left: 4px solid var(--primary);
}

.exemption-item.important {
  background: #fff0f0;
  border-left-color: #dc3545;
}

.exemption-item h4 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-dark);
}

.exemption-reason {
  font-size: 0.875rem;
  color: var(--muted);
  margin: 0;
}

/* ========= 更新时间线 ========= */
.update-timeline {
  margin: 1.5rem 0;
}

.timeline-point {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: var(--radius);
  border-left: 4px solid var(--primary);
}

.timeline-date {
  min-width: 120px;
  font-weight: 600;
  color: var(--primary);
  margin-right: 1rem;
}

.timeline-content {
  flex: 1;
}

/* ========= 返纳情形 ========= */
.return-scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.scenario {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.scenario-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.scenario-content h4 {
  margin: 0 0 0.25rem 0;
  color: var(--primary-dark);
}

.scenario-content p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 取消事由分类 ========= */
.cancellation-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.reason-category {
  padding: 1rem;
  background: white;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.reason-category h4 {
  margin: 0 0 0.75rem 0;
  color: var(--primary-dark);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.reason-category ul {
  padding-left: 1.25rem;
  margin: 0;
}

.reason-category li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 法改正重点 ========= */
.reform-highlights {
  margin: 2rem 0;
}

.reform-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.reform-item.major {
  background: #e7f7e7;
  border-color: #28a745;
}

.reform-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.reform-content h4 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-dark);
}

.reform-content p {
  margin: 0;
  line-height: 1.6;
}

/* ========= 案例和重点盒子 ========= */
.case-scenario {
  background: #f0f7ff;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid var(--primary);
  line-height: 1.6;
}

.highlight-box {
  background: #fff9e6;
  border: 1px solid #ffcc00;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1.5rem 0;
  line-height: 1.6;
}

.highlight-box strong {
  color: #92400e;
}

/* ========= 表格样式 ========= */
.table-container {
  overflow-x: auto;
  margin: 1.5rem 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th, .comparison-table td {
  border: 1px solid var(--border);
  padding: 12px;
  text-align: left;
}

.comparison-table th {
  background-color: var(--primary);
  color: white;
  font-weight: 600;
  text-align: center;
}

.comparison-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.comparison-table tr:hover {
  background-color: #e9ecef;
}

.comparison-table .required {
  color: #28a745;
  font-weight: bold;
  text-align: center;
}

.comparison-table .not-required {
  color: #dc3545;
  font-weight: bold;
  text-align: center;
}

.memory-tip {
  background: #e7f7e7;
  font-style: italic;
  text-align: center;
  font-weight: 600;
}

/* ========= 练习题样式 ========= */
.quiz-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.quiz-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.quiz-item {
  background: #f9f9f9;
  border-radius: var(--radius);
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
  border-color: var(--primary);
  background: var(--primary-light);
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

.answer-btn {
  background: var(--primary);
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
  background: var(--primary-dark);
}

.answer-explanation {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 5px;
  line-height: 1.6;
}

.quiz-actions {
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
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* ========= 底部行动按钮 ========= */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  text-decoration: none;
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, var(--primary-dark), #164536);
}

.action-button.video {
  background: linear-gradient(135deg, #2a7960, #205e4a);
}

.action-button.video:hover {
  background: linear-gradient(135deg, #205e4a, #164536);
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
  
  .license-types-diagram {
    grid-template-columns: 1fr;
  }
  
  .reform-comparison {
    grid-template-columns: 1fr;
  }
  
  .two-column-list {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .return-scenarios {
    grid-template-columns: 1fr;
  }
  
  .cancellation-reasons {
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
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .quiz-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .timeline-point {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .timeline-date {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>