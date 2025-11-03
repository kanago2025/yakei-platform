<!-- src/views/notes/business/37Document.vue -->
<template>
  <div class="document37-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>37条书面</span>
        </div>
        <h1>37条书面（契约书交付义务）</h1>
        <p>宅建业者在契约成立后必须向当事人交付的契约内容书面，确保交易透明度和事后纠纷预防</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">18</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">45分钟</span>
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
            <li>理解37条书面的法律定位和交付时机要求</li>
            <li>掌握必须记载事项和任意记载事项的区别</li>
            <li>熟悉37条书面与35条书面的核心差异</li>
            <li>了解交付对象、交付方式和例外情况</li>
            <li>掌握实务中的正确交付流程和注意事项</li>
          </ul>
        </section>

        <!-- 关键术语 -->
        <section id="key-terms" class="key-terms">
          <h2>🔤 关键术语</h2>
          <div class="terms-grid">
            <div class="term-card">
              <div class="term-japanese">37条書面（37じょうしょめん）</div>
              <div class="term-chinese">37条书面</div>
              <div class="term-explanation">宅建业法第37条规定的契约书交付义务，契约成立后必须交付的书面文件</div>
              <div class="term-example">包含契约双方合意的具体内容，作为法律凭证</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">必要的記載事項（ひつようてききさいじこう）</div>
              <div class="term-chinese">必须记载事项</div>
              <div class="term-explanation">无论契约内容如何都必须记载的法定事项，缺少则书面无效</div>
              <div class="term-example">当事人信息、物件特定表示、代金金额等</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">任意的記載事項（にんいてききさいじこう）</div>
              <div class="term-chinese">任意记载事项</div>
              <div class="term-explanation">契约中有相关约定时才需要记载的事项，无约定则无需记载</div>
              <div class="term-example">契约解除条款、违约金、危险负担等</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">電磁的方法（でんじてきほうほう）</div>
              <div class="term-chinese">电磁方法</div>
              <div class="term-explanation">经当事人同意后，可用电子数据方式代替纸质书面交付</div>
              <div class="term-example">电子邮件、专用系统等电子方式交付</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">契約の両当事者（けいやくのりょうとうじしゃ）</div>
              <div class="term-chinese">契约双方当事人</div>
              <div class="term-explanation">买卖、交换、借贷等契约的双方当事人都要交付37条书面</div>
              <div class="term-example">卖主与买主、贷主与借主都需要接收书面</div>
            </div>
          </div>
        </section>

        <!-- 基本概念 -->
        <section id="basic-concept" class="content-section">
          <h2>1. 37条书面的基本概念</h2>
          
          <div class="concept-definition">
            <div class="definition-card">
              <h3>📝 什么是37条书面？</h3>
              <p>根据<strong>宅地建物取引业法第37条</strong>规定，宅建业者在契约成立后必须向契约双方当事人交付的<strong>契约内容书面</strong>。</p>
              <div class="legal-basis">
                <strong>法律依据：</strong>宅建业法第37条第1项、第2项
              </div>
            </div>
          </div>

          <h3>37条书面的目的</h3>
          <div class="purpose-grid">
            <div class="purpose-item">
              <div class="purpose-icon">🛡️</div>
              <div class="purpose-content">
                <h4>纠纷预防</h4>
                <p>明确记载双方合意内容，防止事后因记忆不清或理解差异产生纠纷</p>
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">📋</div>
              <div class="purpose-content">
                <h4>交易透明</h4>
                <p>确保交易条件公开透明，保护消费者权益</p>
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">⚖️</div>
              <div class="purpose-content">
                <h4>法律凭证</h4>
                <p>作为法律上的重要证据，在纠纷解决中发挥关键作用</p>
              </div>
            </div>
          </div>

          <h3>交付时机要求</h3>
          <div class="timing-requirement">
            <div class="timing-card important">
              <div class="timing-icon">⏰</div>
              <div class="timing-content">
                <h4>契約成立後遅滞なく</h4>
                <p><strong>契约成立后必须立即交付</strong>，不得有不合理的延迟</p>
                <div class="timing-note">实务中通常在契约成立当日或次日交付</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 法律依据 -->
        <section id="legal-basis" class="content-section">
          <h2>2. 法律依据与实务要点</h2>
          
          <h3>宅建业法第37条核心内容</h3>
          <div class="legal-content">
            <div class="law-article">
              <h4>第37条第1项（买卖、交换契约）</h4>
              <p>宅建业者在宅地或建物的买卖、交换契约中：</p>
              <ul>
                <li>自ら当事者として契約締結：向对方交付</li>
                <li>当事者を代理して契約締結：向对方及委托者交付</li>
                <li>媒介により契約成立：向各当事人交付</li>
              </ul>
            </div>
            <div class="law-article">
              <h4>第37条第2项（借贷契约）</h4>
              <p>宅建业者在宅地或建物的借贷契约中：</p>
              <ul>
                <li>当事者を代理して契約締結：向对方及委托者交付</li>
                <li>媒介により契約成立：向各当事人交付</li>
              </ul>
            </div>
          </div>

          <h3>交付对象要求</h3>
          <div class="delivery-target">
            <div class="target-comparison">
              <div class="comparison-item">
                <h4>📄 37条书面交付对象</h4>
                <ul>
                  <li><strong>契约双方当事人</strong></li>
                  <li>买卖：卖主与买主</li>
                  <li>交换：双方当事者</li>
                  <li>借贷：贷主与借主</li>
                  <li>对方是宅建业者时<strong>同样需要交付</strong></li>
                </ul>
              </div>
              <div class="comparison-item">
                <h4>📋 35条说明对象</h4>
                <ul>
                  <li><strong>契约的一方当事人</strong></li>
                  <li>取得或借入宅地建物的一方</li>
                  <li>对方是宅建业者时<strong>不需要说明</strong></li>
                  <li>需宅建士当面说明</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>多个业者参与的情况</h3>
          <div class="multiple-agents">
            <div class="notice-box important">
              <strong>所有相关宅建业者都有交付义务</strong>
              <p>同一交易中有多个宅建业者参与时，<strong>所有相关的宅建业者</strong>都必须履行37条书面交付义务</p>
              <div class="exception-note">
                <strong>例外：</strong>自ら貸主となる宅建業者は除く（自己作为贷主的宅建业者除外）
              </div>
            </div>
          </div>
        </section>

        <!-- 必须记载事项 -->
        <section id="required-items" class="content-section">
          <h2>3. 必须记载事项（必要的記載事項）</h2>
          
          <div class="notice-box important">
            <strong>必须记载！无论契约内容如何都必须记载</strong>
            <p>以下事项即使契约中没有约定，或得到双方同意不记载，也<strong>必须记载</strong>在37条书面中</p>
          </div>

          <h3>买卖、交换契约的必须记载事项</h3>
          <div class="required-items-grid">
            <div class="required-item">
              <div class="item-number">A</div>
              <div class="item-content">
                <h4>契約当事者の氏名・住所</h4>
                <p>契约当事人的姓名和住所</p>
                <div class="item-note">法人需记载名称</div>
              </div>
            </div>
            <div class="required-item">
              <div class="item-number">B</div>
              <div class="item-content">
                <h4>物件特定表示</h4>
                <p>宅地的所在、地番等；建物的所在、种类、结构等</p>
                <div class="item-note">足以特定物件的必要信息</div>
              </div>
            </div>
            <div class="required-item">
              <div class="item-number">C</div>
              <div class="item-content">
                <h4>既存建物構造確認事項</h4>
                <p>既存建物关于构造耐力主要部分等状况的双方确认事项</p>
                <div class="item-note">仅限既存建物</div>
              </div>
            </div>
            <div class="required-item">
              <div class="item-number">D</div>
              <div class="item-content">
                <h4>代金・交換差金</h4>
                <p>金额、支付时期及支付方法</p>
                <div class="item-note">借贷契约不需要</div>
              </div>
            </div>
            <div class="required-item">
              <div class="item-number">E</div>
              <div class="item-content">
                <h4>引渡時期</h4>
                <p>宅地或建物的交付时期</p>
                <div class="item-note">所有契约类型都需要</div>
              </div>
            </div>
            <div class="required-item">
              <div class="item-number">F</div>
              <div class="item-content">
                <h4>移転登記申請時期</h4>
                <p>所有权转移登记的申请时期</p>
                <div class="item-note">借贷契约不需要</div>
              </div>
            </div>
          </div>

          <h3>借贷契约的必须记载事项</h3>
          <div class="rental-required">
            <div class="table-container">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>事项</th>
                    <th>买卖・交换</th>
                    <th>借贷</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>当事人姓名住所</td>
                    <td>✅ 必须</td>
                    <td>✅ 必须</td>
                  </tr>
                  <tr>
                    <td>物件特定表示</td>
                    <td>✅ 必须</td>
                    <td>✅ 必须</td>
                  </tr>
                  <tr>
                    <td>代金/交换差金</td>
                    <td>✅ 必须</td>
                    <td>❌ 不需要</td>
                  </tr>
                  <tr>
                    <td>借贷金额</td>
                    <td>❌ 不需要</td>
                    <td>✅ 必须</td>
                  </tr>
                  <tr>
                    <td>交付时期</td>
                    <td>✅ 必须</td>
                    <td>✅ 必须</td>
                  </tr>
                  <tr>
                    <td>登记申请时期</td>
                    <td>✅ 必须</td>
                    <td>❌ 不需要</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 任意记载事项 -->
        <section id="optional-items" class="content-section">
          <h2>4. 任意记载事项（任意的記載事項）</h2>
          
          <div class="notice-box">
            <strong>有约定才记载，无约定不记载</strong>
            <p>以下事项只有在契约中有相关约定时才需要记载，没有约定则无需记载</p>
          </div>

          <h3>买卖、交换契约的任意记载事项</h3>
          <div class="optional-items-grid">
            <div class="optional-category">
              <h4>💰 金钱相关事项</h4>
              <ul>
                <li><strong>代金及交换差金以外金钱</strong>：金额、授受时期及目的</li>
                <li><strong>贷款斡旋</strong>：代金・交换差金相关贷款斡旋内容及不成立时的措施</li>
              </ul>
            </div>
            <div class="optional-category">
              <h4>⚖️ 法律条款相关</h4>
              <ul>
                <li><strong>契约解除</strong>：相关约定的内容</li>
                <li><strong>损害赔偿额预定或违约金</strong>：相关约定的内容</li>
                <li><strong>危险负担</strong>：天灾等不可抗力造成损害负担的约定</li>
              </ul>
            </div>
            <div class="optional-category">
              <h4>🏠 物件责任相关</h4>
              <ul>
                <li><strong>契约不適合担保責任</strong>：种类品质不适合时的责任内容</li>
                <li><strong>保证保险契约</strong>：责任履行相关的保证保险契约等措施</li>
                <li><strong>租税公课负担</strong>：宅地建物相关租税及其他公课负担的约定</li>
              </ul>
            </div>
          </div>

          <h3>借贷契约的特殊规则</h3>
          <div class="rental-special">
            <div class="special-rule">
              <h4>🚫 借贷契约中无需记载的事项</h4>
              <p>即使契约中有以下约定，在借贷契约的37条书面中也<strong>无需记载</strong>：</p>
              <ul>
                <li>代金・交换差金相关贷款斡旋的约定</li>
                <li>契约不適合担保責任的约定</li>
                <li>租税公课负担的约定</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 35条与37条比较 -->
        <section id="comparison" class="content-section">
          <h2>5. 35条书面 vs 37条书面</h2>
          
          <h3>核心差异对比</h3>
          <div class="comparison-table-large">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>比较项目</th>
                  <th>35条书面（重要事项说明）</th>
                  <th>37条书面（契约书）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>交付时机</strong></td>
                  <td>契約成立前</td>
                  <td>契約成立後遅滞なく</td>
                </tr>
                <tr>
                  <td><strong>交付对象</strong></td>
                  <td>取得/借入的一方</td>
                  <td>契约双方当事人</td>
                </tr>
                <tr>
                  <td><strong>宅建士要求</strong></td>
                  <td>必须当面说明 + 记名</td>
                  <td>只需记名，无需说明</td>
                </tr>
                <tr>
                  <td><strong>内容性质</strong></td>
                  <td>事实信息说明</td>
                  <td>双方合意内容记载</td>
                </tr>
                <tr>
                  <td><strong>对方是业者时</strong></td>
                  <td>不需要说明</td>
                  <td>需要交付</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>具体事项记载对比</h3>
          <div class="detailed-comparison">
            <div class="table-container">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>记载事项</th>
                    <th>35条书面</th>
                    <th>37条书面</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>既存建物構造確認事項</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>双方都必须记载</td>
                  </tr>
                  <tr>
                    <td>代金/交换差金/借贷</td>
                    <td>❌</td>
                    <td>✅</td>
                    <td>37条必须记载</td>
                  </tr>
                  <tr>
                    <td>引渡時期</td>
                    <td>❌</td>
                    <td>✅</td>
                    <td>37条必须记载</td>
                  </tr>
                  <tr>
                    <td>移転登記申請時期</td>
                    <td>❌</td>
                    <td>✅★</td>
                    <td>★借贷不要</td>
                  </tr>
                  <tr>
                    <td>危险负担（天灾等）</td>
                    <td>❌</td>
                    <td>▲</td>
                    <td>有约定则记载</td>
                  </tr>
                  <tr>
                    <td>契约不適合担保責任</td>
                    <td>❌</td>
                    <td>▲★</td>
                    <td>★借贷不要</td>
                  </tr>
                  <tr>
                    <td>租税公课负担</td>
                    <td>❌</td>
                    <td>▲★</td>
                    <td>★借贷不要</td>
                  </tr>
                  <tr>
                    <td>契约解除</td>
                    <td>✅</td>
                    <td>▲</td>
                    <td>35条说明，37条有约定则记载</td>
                  </tr>
                  <tr>
                    <td>损害赔偿/违约金</td>
                    <td>✅</td>
                    <td>▲</td>
                    <td>35条说明，37条有约定则记载</td>
                  </tr>
                  <tr>
                    <td>代金以外金钱</td>
                    <td>✅※</td>
                    <td>▲</td>
                    <td>※35条不说明时期</td>
                  </tr>
                  <tr>
                    <td>贷款斡旋不成立措施</td>
                    <td>✅★</td>
                    <td>▲★</td>
                    <td>★买卖交换のみ</td>
                  </tr>
                  <tr>
                    <td>保证保险契约等措施</td>
                    <td>✅★</td>
                    <td>▲★</td>
                    <td>★买卖交换のみ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-legend">
              <p><strong>图例：</strong> ✅必须 ✕不要 ▲有约定则记载 ★仅买卖交换（借贷不要）</p>
            </div>
          </div>
        </section>

        <!-- 实务要点 -->
        <section id="practical-points" class="content-section">
          <h2>6. 实务要点与注意事项</h2>
          
          <h3>交付方式与技术要求</h3>
          <div class="delivery-methods">
            <div class="method-item">
              <h4>📄 传统纸质交付</h4>
              <ul>
                <li>宅建士<strong>必须记名</strong></li>
                <li>交付人<strong>不限于宅建士</strong>，其他从业者也可交付</li>
                <li>交付场所<strong>没有限制</strong></li>
              </ul>
            </div>
            <div class="method-item">
              <h4>💻 电磁方法交付</h4>
              <ul>
                <li>经<strong>双方当事人同意</strong>可使用电磁方法</li>
                <li>需采取<strong>替代记名的相应措施</strong></li>
                <li>视为与传统交付<strong>同等效力</strong></li>
              </ul>
            </div>
          </div>

          <h3>宅建士的记名要求</h3>
          <div class="signature-requirements">
            <div class="requirement-grid">
              <div class="req-item">
                <h4>✍️ 37条书面记名</h4>
                <ul>
                  <li>宅建业者<strong>必须让宅建士记名</strong></li>
                  <li>记名位置在书面适当位置</li>
                  <li>电磁方法交付时需有替代措施</li>
                </ul>
              </div>
              <div class="req-item">
                <h4>🔍 与35条记名区别</h4>
                <ul>
                  <li>35条：说明<strong>前</strong>记名 + 说明</li>
                  <li>37条：交付<strong>前</strong>记名（无需说明）</li>
                  <li>两份书面都需宅建士记名</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>重要实务注意事项</h3>
          <div class="practical-notes">
            <div class="note-item important">
              <h4>🚨 特别注意</h4>
              <ul>
                <li>37条书面<strong>不需要说明</strong>，只需交付</li>
                <li>内容以<strong>双方合意事项</strong>为中心记载</li>
                <li>特约事项<strong>原则上都需要记载</strong></li>
                <li>交付迟延可能违反宅建业法</li>
              </ul>
            </div>
            <div class="note-item">
              <h4>💡 实务技巧</h4>
              <ul>
                <li>准备标准化的37条书面模板</li>
                <li>确保所有必须记载事项完整</li>
                <li>特约事项要明确具体地记载</li>
                <li>交付后请对方签收确认</li>
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
          <router-link to="/video?topic=37document" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=37document" class="action-button">
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
  { id: 'key-terms', title: '关键术语', icon: '🔤' },
  { id: 'basic-concept', title: '基本概念', icon: '📝' },
  { id: 'legal-basis', title: '法律依据', icon: '⚖️' },
  { id: 'required-items', title: '必须记载事项', icon: '📋' },
  { id: 'optional-items', title: '任意记载事项', icon: '📄' },
  { id: 'comparison', title: '35条vs37条', icon: '🔄' },
  { id: 'practical-points', title: '实务要点', icon: '💡' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者Ａが行う媒介業務に関し、Ａが建物の売買契約を成立させた場合において、天災その他不可抗力による損害の負担に関する定めがあるときは、重要事項説明書にその旨記載していたとしても、その内容を37条書面に記載しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '正确。危险负担（天灾等不可抗力）属于任意记载事项，契约中有相关约定时必须在37条书面中记载。'
  },
  {
    question: '37条書面の交付は、宅地建物取引士が自ら行わなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '错误。37条书面的交付不限于宅建士，其他从业者也可交付，但书面必须由宅建士记名。'
  },
  {
    question: '宅地建物取引業者は、宅地の貸借の媒介により契約が成立した場合、借主に対してのみ37条書面を交付すればよい。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '错误。37条书面必须向契约双方当事人交付，借贷契约中需向贷主和借主双方交付。'
  },
  {
    question: '37条書面には、契約の解除に関する定めがある場合、その内容を記載しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '正确。契约解除属于任意记载事项，契约中有相关约定时必须在37条书面中记载。'
  },
  {
    question: '宅地建物取引業者が自ら売主となる宅地の売買契約において、代金の支払方法について特段の定めがない場合でも、37条書面に代金の支払方法を記載しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '正确。代金的支付时期及方法是必须记载事项，无论契约中有无特殊约定都必须记载。'
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
  learningStore.recordTopicStudyTime('37document', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('37document')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('37document')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('37document', 0)
  
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
.document37-page {
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

/* ========= 基本概念样式 ========= */
.concept-definition {
  margin: 2rem 0;
}

.definition-card {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  border-left: 4px solid #2a7960;
}

.definition-card h3 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.definition-card p {
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.legal-basis {
  padding: 0.75rem;
  background: white;
  border-radius: 5px;
  font-size: 0.875rem;
  border: 1px solid #e9ecef;
}

.purpose-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.purpose-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.purpose-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.purpose-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.purpose-content p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
}

.timing-requirement {
  margin: 2rem 0;
}

.timing-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.timing-card.important {
  background: #fff9e6;
  border: 1px solid #ffcc00;
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
  margin: 0 0 0.5rem 0;
}

.timing-note {
  font-size: 0.75rem;
  color: #6c757d;
}

/* ========= 法律依据样式 ========= */
.legal-content {
  margin: 2rem 0;
}

.law-article {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.law-article h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.law-article p {
  margin: 0 0 1rem 0;
}

.law-article ul {
  padding-left: 1.25rem;
  margin: 0;
}

.law-article li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.delivery-target {
  margin: 2rem 0;
}

.target-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.comparison-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comparison-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.comparison-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.multiple-agents {
  margin: 2rem 0;
}

.notice-box {
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.notice-box.important {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.notice-box strong {
  color: #c62828;
}

.exception-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: white;
  border-radius: 5px;
  font-size: 0.875rem;
}

/* ========= 必须记载事项样式 ========= */
.required-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.required-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.item-number {
  width: 30px;
  height: 30px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.item-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.item-content p {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}

.item-note {
  font-size: 0.75rem;
  color: #6c757d;
}

.rental-required {
  margin: 2rem 0;
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
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: left;
}

.comparison-table th {
  background-color: #2a7960;
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

.table-legend {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 任意记载事项样式 ========= */
.optional-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.optional-category {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.optional-category h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.optional-category ul {
  padding-left: 1.25rem;
  margin: 0;
}

.optional-category li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.rental-special {
  margin: 2rem 0;
}

.special-rule {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 12px;
  border: 1px solid #ffcc00;
}

.special-rule h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.special-rule p {
  margin: 0 0 1rem 0;
}

.special-rule ul {
  padding-left: 1.25rem;
  margin: 0;
}

.special-rule li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 比较表格样式 ========= */
.comparison-table-large {
  margin: 2rem 0;
}

.detailed-comparison {
  margin: 2rem 0;
}

/* ========= 实务要点样式 ========= */
.delivery-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.method-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.method-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.method-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.method-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.signature-requirements {
  margin: 2rem 0;
}

.requirement-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.req-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.req-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.req-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.req-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.practical-notes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.note-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.note-item.important {
  background: #ffe7e7;
  border: 1px solid #dc3545;
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
  
  .purpose-grid {
    grid-template-columns: 1fr;
  }
  
  .target-comparison {
    grid-template-columns: 1fr;
  }
  
  .required-items-grid {
    grid-template-columns: 1fr;
  }
  
  .optional-items-grid {
    grid-template-columns: 1fr;
  }
  
  .delivery-methods {
    grid-template-columns: 1fr;
  }
  
  .requirement-grid {
    grid-template-columns: 1fr;
  }
  
  .practical-notes {
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