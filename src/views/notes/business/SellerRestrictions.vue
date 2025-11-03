<!-- src/views/notes/business/SellerRestrictions.vue -->
<template>
  <div class="seller-restrictions-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>自ら売主制限</span>
        </div>
        <h1>自ら売主制限</h1>
        <p>宅建业者作为卖方时的特殊限制规定，保护消费者权益的核心制度</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">8</span>
            <span class="stat-label">核心限制</span>
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
            <li>掌握自ら売主制限的适用范围和基本概念</li>
            <li>理解クーリング・オフ制度的详细规定</li>
            <li>熟悉损害赔偿、定金、保全措施的具体限制</li>
            <li>了解他人物销售和分期付款销售的特殊规定</li>
            <li>掌握各项限制的例外情况和实务要点</li>
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
          <h2>1. 基本概念</h2>
          
          <h3>自ら売主制限的定义</h3>
          <div class="definition-box">
            <p><strong>自ら売主制限</strong>是指宅地建物取引業者在<strong>自己作为卖方</strong>进行不动产买卖时，法律规定的8种特殊限制措施。</p>
          </div>

          <h3>适用范围</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>卖方</th>
                  <th>买方</th>
                  <th>自ら売主制限适用</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>宅建业者</strong></td>
                  <td>宅建业者<strong>以外</strong></td>
                  <td>✅ 适用</td>
                  <td>保护消费者，防止滥用优势地位</td>
                </tr>
                <tr>
                  <td><strong>宅建业者</strong></td>
                  <td><strong>宅建业者</strong></td>
                  <td>❌ 不适用</td>
                  <td>业者间交易，双方具有专业知识</td>
                </tr>
                <tr>
                  <td>宅建业者以外</td>
                  <td>宅建业者以外</td>
                  <td>❌ 不适用</td>
                  <td>非业者交易，不适用业法规制</td>
                </tr>
                <tr>
                  <td>宅建业者以外</td>
                  <td><strong>宅建业者</strong></td>
                  <td>❌ 不适用</td>
                  <td>业者作为买方，具有专业知识</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>8种限制措施概览</h3>
          <div class="restrictions-overview">
            <div class="restriction-item">
              <div class="restriction-number">1</div>
              <div class="restriction-content">
                <h4>クーリング・オフ</h4>
                <p>冷静期制度，特定条件下可无条件解除合同</p>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-number">2</div>
              <div class="restriction-content">
                <h4>損害賠償額の予定等の制限</h4>
                <p>损害赔偿额预定和违约金的限制</p>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-number">3</div>
              <div class="restriction-content">
                <h4>手付の額・性質の制限</h4>
                <p>定金金额和性质的限制</p>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-number">4</div>
              <div class="restriction-content">
                <h4>手付金等の保全措置</h4>
                <p>定金等款项的保全措施</p>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-number">5</div>
              <div class="restriction-content">
                <h4>自己所有でない物件の契約締結制限</h4>
                <p>非自己所有物件的契约缔结限制</p>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-number">6</div>
              <div class="restriction-content">
                <h4>契約不適合責任の特約制限</h4>
                <p>契约不适合责任特约的限制</p>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-number">7</div>
              <div class="restriction-content">
                <h4>割賦販売の解除等の制限</h4>
                <p>分期付款销售解除的限制</p>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-number">8</div>
              <div class="restriction-content">
                <h4>所有権留保等の禁止</h4>
                <p>所有权保留等的禁止</p>
              </div>
            </div>
          </div>
        </section>

        <!-- クーリング・オフ制度 -->
        <section id="cooling-off" class="content-section">
          <h2>2. クーリング・オフ制度</h2>
          
          <h3>基本概念</h3>
          <div class="cooling-off-basics">
            <div class="concept-item">
              <h4>📝 定义</h4>
              <p>买方在特定条件下可<strong>无条件解除</strong>合同的权利，无需承担损害赔偿责任。</p>
            </div>
            <div class="concept-item">
              <h4>⚖️ 法律依据</h4>
              <p>宅建业法<strong>第37条の2</strong></p>
            </div>
            <div class="concept-item">
              <h4>🎯 目的</h4>
              <p>保护在非冷静判断场所签订合同的消费者</p>
            </div>
          </div>

          <h3>适用条件</h3>
          <div class="applicable-conditions">
            <div class="condition-type">
              <h4>✅ 可行使クーリング・オフ的情况</h4>
              <ul>
                <li>在<strong>業者事務所等以外</strong>的场所进行买受申请</li>
                <li>在<strong>業者事務所等以外</strong>的场所签订买卖契约</li>
                <li>买方为<strong>宅建业者以外</strong>的个人</li>
              </ul>
            </div>
            <div class="condition-type">
              <h4>❌ 不能行使クーリング・オフ的情况</h4>
              <ul>
                <li>在業者事務所进行买受申请（即使在其他场所签约）</li>
                <li>在業者事務所签订买卖契约</li>
                <li>买方为宅建业者</li>
              </ul>
            </div>
          </div>

          <h3>不能行使クーリング・オフ的场所</h3>
          <div class="non-applicable-places">
            <div class="place-item">
              <h4>🏢 業者事務所</h4>
              <p>宅建业者的事务所（冷静判断可能场所）</p>
            </div>
            <div class="place-item">
              <h4>🏠 専任宅建士設置案内所</h4>
              <p>设置专任宅建士的案内所（如样板间）</p>
              <div class="note">土地に定着していないテント張り案内所は除外</div>
            </div>
            <div class="place-item">
              <h4>🤝 売主依頼媒介・代理業者の事務所</h4>
              <p>卖方委托的媒介或代理业者的事务所</p>
              <div class="note">依頼を受けていない業者の事務所は除外</div>
            </div>
            <div class="place-item">
              <h4>🏡 買主申出の自宅・勤務先</h4>
              <p>买方主动提出的自宅或工作场所</p>
              <div class="note">売主から申出た買主の自宅は除外</div>
            </div>
          </div>

          <h3>クーリング・オフ失效的情况</h3>
          <div class="cooling-off-expiration">
            <div class="expiration-item">
              <h4>⏰ 期限经过</h4>
              <p>業者から<strong>書面で</strong>クーリング・オフ可能旨・方法を告げられた日から<strong>8日経過</strong></p>
              <div class="note">口頭告知のみでは不成立，初日を1日目として計算</div>
            </div>
            <div class="expiration-item">
              <h4>💰 履行完毕</h4>
              <p>買主が<strong>引渡しを受け</strong>かつ<strong>代金全額を支払った</strong>場合</p>
              <div class="note">両方の条件が揃う必要あり</div>
            </div>
          </div>

          <h3>行使方法和效果</h3>
          <div class="cooling-off-procedure">
            <div class="procedure-step">
              <h4>📄 行使方法</h4>
              <p>必须通过<strong>书面形式</strong>行使，买方发出书面通知时生效</p>
            </div>
            <div class="procedure-step">
              <h4>🔄 效果</h4>
              <ul>
                <li>合同<strong>无条件解除</strong></li>
                <li>業者必须<strong>速やかに返還</strong>已收款项</li>
                <li>業者<strong>不能请求</strong>损害赔偿或违约金</li>
              </ul>
            </div>
            <div class="procedure-step">
              <h4>🚫 无效特约</h4>
              <p>违反クーリング・オフ规定且对买方不利的特约<strong>无效</strong></p>
            </div>
          </div>
        </section>

        <!-- 损害赔偿等限制 -->
        <section id="damage-compensation" class="content-section">
          <h2>3. 損害賠償額の予定等の制限</h2>
          
          <h3>法律规定</h3>
          <div class="legal-provision">
            <div class="provision-box important">
              <h4>宅建业法第38条</h4>
              <p>宅建业者作为卖方时，因债务不履行解除合同的<strong>损害赔偿额预定和违约金合计金额</strong>不得超过<strong>价款金额的20%</strong>。</p>
            </div>
          </div>

          <h3>具体限制</h3>
          <div class="compensation-limits">
            <div class="limit-item">
              <h4>💰 上限规定</h4>
              <p>损害赔偿额预定 + 违约金 ≤ 价款金额 × 20%</p>
            </div>
            <div class="limit-item">
              <h4>🚫 超过部分</h4>
              <p>超过20%的部分<strong>无效</strong></p>
            </div>
            <div class="limit-item">
              <h4>📝 未预定情况</h4>
              <p>未预定损害赔偿额时，可<strong>按实际损害金额请求</strong>，无上限限制</p>
            </div>
          </div>

          <h3>实务要点</h3>
          <div class="practice-points">
            <div class="point-item">
              <h4>例：价款3,500万円的情况</h4>
              <div class="calculation-example">
                <p>损害赔偿额预定 + 违约金 ≤ 3,500万円 × 20% = <strong>700万円</strong></p>
                <p>设定700万円 → ✅ 有效</p>
                <p>设定800万円 → ❌ 超过部分100万円无效</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 定金限制 -->
        <section id="deposit-restrictions" class="content-section">
          <h2>4. 手付の額・性質の制限</h2>
          
          <h3>定金性质的限制</h3>
          <div class="deposit-nature">
            <div class="nature-item">
              <h4>⚖️ 法定性质</h4>
              <p>宅建业法规定必须作为<strong>解约定金</strong>处理</p>
            </div>
            <div class="nature-item">
              <h4>🔄 解约权利</h4>
              <p>买方：放弃定金即可解除合同</p>
              <p>卖方：提供双倍定金方可解除合同</p>
            </div>
          </div>

          <h3>特约有效性判断</h3>
          <div class="special-agreement-validation">
            <div class="agreement-item valid">
              <h4>✅ 有效特约</h4>
              <ul>
                <li>买方放弃<strong>定金半额</strong>，卖方提供<strong>倍額</strong>解除</li>
                <li>买方放弃定金，卖方提供<strong>3倍金额</strong>解除</li>
              </ul>
            </div>
            <div class="agreement-item invalid">
              <h4>❌ 无效特约</h4>
              <ul>
                <li>不承认定金解除（剥夺买方解除权）</li>
                <li>对买方不利的定金相关特约</li>
              </ul>
            </div>
          </div>

          <h3>定金金额的限制</h3>
          <div class="deposit-amount">
            <div class="amount-limit">
              <h4>💰 金额上限</h4>
              <p>定金金额不得超过<strong>价款金额的20%</strong></p>
            </div>
            <div class="amount-example">
              <h4>例：价款2,000万円的情况</h4>
              <div class="calculation">
                <p>定金上限 = 2,000万円 × 20% = <strong>400万円</strong></p>
                <p>收取500万円 → ❌ 超过部分100万円无效</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 定金保全措施 -->
        <section id="deposit-security" class="content-section">
          <h2>5. 手付金等の保全措置</h2>
          
          <h3>手付金等的定义</h3>
          <div class="deposit-definition">
            <p><strong>手付金等</strong>是指<strong>契约缔结后、引渡前</strong>支付且<strong>充当价款</strong>的金钱，包括：</p>
            <div class="deposit-types">
              <div class="type-item">手付金（定金）</div>
              <div class="type-item">中间金</div>
              <div class="type-item">其他前期付款</div>
            </div>
          </div>

          <h3>保全措施的种类</h3>
          <div class="security-measures">
            <div class="measure-type">
              <h4>🏦 银行等保证委托契约</h4>
              <p>与银行等金融机构签订保证委托契约</p>
            </div>
            <div class="measure-type">
              <h4>📄 保险事业者保证保险契约</h4>
              <p>与保险事业者签订保证保险契约</p>
            </div>
            <div class="measure-type">
              <h4>🔒 指定保管机关寄托契约</h4>
              <p>与指定保管机关签订手付金等寄托契约</p>
              <div class="note limitation">❌ <strong>未完成物件不能使用</strong></div>
            </div>
          </div>

          <h3>物件类型与保全措施适用</h3>
          <div class="property-type-security">
            <div class="table-container">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>物件类型</th>
                    <th>银行等保证</th>
                    <th>保险保证</th>
                    <th>指定保管机关寄托</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>未完成物件</strong></td>
                    <td>✅ 可</td>
                    <td>✅ 可</td>
                    <td>❌ 不可</td>
                  </tr>
                  <tr>
                    <td><strong>完成物件</strong></td>
                    <td>✅ 可</td>
                    <td>✅ 可</td>
                    <td>✅ 可</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>保全措施不要的情况</h3>
          <div class="security-exceptions">
            <div class="exception-item">
              <h4>💰 金额较小</h4>
              <ul>
                <li><strong>未完成物件</strong>：手付金等合计 ≤ 价款的<strong>5%</strong>且 ≤ 1,000万円</li>
                <li><strong>完成物件</strong>：手付金等合计 ≤ 价款的<strong>10%</strong>且 ≤ 1,000万円</li>
              </ul>
            </div>
            <div class="exception-item">
              <h4>🏠 登记完成</h4>
              <p>买方已完成<strong>所有权转移登记</strong></p>
            </div>
          </div>

          <h3>买方权利</h3>
          <div class="buyer-rights">
            <div class="right-item important">
              <h4>🚫 支付拒绝权</h4>
              <p>業者未采取保全措施时，买方<strong>可拒绝支付</strong>手付金等，不构成债务不履行。</p>
            </div>
          </div>
        </section>

        <!-- 他人物销售限制 -->
        <section id="third-party-property" class="content-section">
          <h2>6. 自己所有でない物件の契約締結制限</h2>
          
          <h3>基本原则</h3>
          <div class="basic-principle">
            <div class="principle-box important">
              <h4>宅建业法第33条の2</h4>
              <p>宅建业者<strong>原则上禁止</strong>销售<strong>非自己所有</strong>的不动产。</p>
            </div>
          </div>

          <h3>例外情况</h3>
          <div class="exceptions">
            <div class="exception-item">
              <h4>✅ 允许销售的情况</h4>
              <ul>
                <li>与现所有者签订<strong>取得契约或预约</strong></li>
                <li>業者<strong>明显能够取得</strong>该不动产的情况</li>
              </ul>
            </div>
            <div class="exception-item">
              <h4>❌ 禁止销售的情况</h4>
              <ul>
                <li><strong>停止条件付契约</strong>（条件成就前）</li>
                <li>无任何取得保证的情况</li>
              </ul>
            </div>
          </div>

          <h3>未完成物件的特殊规定</h3>
          <div class="unfinished-property">
            <div class="property-rules">
              <div class="rule-item">
                <h4>🏗️ 未完成物件</h4>
                <p>原则上<strong>禁止销售</strong>未完成物件</p>
              </div>
              <div class="rule-item">
                <h4>✅ 例外情况</h4>
                <ul>
                  <li>已采取<strong>手付金等保全措施</strong></li>
                  <li>无需采取保全措施的情况（金额较小等）</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 契约不适合责任 -->
        <section id="non-conformity" class="content-section">
          <h2>7. 契約不適合責任の特約制限</h2>
          
          <h3>民法规定</h3>
          <div class="civil-law">
            <div class="law-item">
              <h4>📚 买方权利</h4>
              <ul>
                <li>追完请求（修补、替换）</li>
                <li>代金减额请求</li>
                <li>损害赔偿请求</li>
                <li>契约解除</li>
              </ul>
            </div>
            <div class="law-item">
              <h4>⚖️ 通知期间</h4>
              <p>买方知道不适合事实后<strong>1年以内</strong>通知</p>
            </div>
          </div>

          <h3>宅建业法限制</h3>
          <div class="real-estate-law">
            <div class="restriction-item">
              <h4>🚫 禁止不利特约</h4>
              <p>不得设定比民法规定<strong>更不利于买方</strong>的特约</p>
            </div>
            <div class="restriction-item">
              <h4>✅ 例外允许</h4>
              <p><strong>引渡后2年以上</strong>的通知期间特约有效</p>
            </div>
          </div>

          <h3>特约有效性判断</h3>
          <div class="agreement-validation">
            <div class="validation-item invalid">
              <h4>❌ 无效特约</h4>
              <ul>
                <li>买方知道后<strong>6个月以内</strong>通知（比民法1年不利）</li>
                <li>契约缔结后<strong>3年以内</strong>通知</li>
                <li>卖方不承担任何契约不适合责任</li>
              </ul>
            </div>
            <div class="validation-item valid">
              <h4>✅ 有效特约</h4>
              <ul>
                <li>引渡后<strong>3年以内</strong>通知（2年以上允许）</li>
                <li>比民法规定更有利于买方的特约</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 分期付款销售 -->
        <section id="installment-sales" class="content-section">
          <h2>8. 割賦販売契約</h2>
          
          <h3>定义</h3>
          <div class="definition">
            <div class="definition-box">
              <p><strong>割賦販売</strong>是指引渡后<strong>1年以上期间</strong>，分<strong>2次以上</strong>支付价款的销售方式。</p>
            </div>
          </div>

          <h3>解除限制</h3>
          <div class="cancellation-restrictions">
            <div class="restriction-item">
              <h4>⏰ 催告要求</h4>
              <p>买方支付迟延时，必须：</p>
              <ul>
                <li>设定<strong>30日以上</strong>的相当期间</li>
                <li>通过<strong>书面形式</strong>催告</li>
                <li>期间内仍未支付方可解除</li>
              </ul>
            </div>
          </div>

          <h3>所有权保留禁止</h3>
          <div class="ownership-retention">
            <div class="retention-rules">
              <div class="rule-item">
                <h4>🚫 基本原则</h4>
                <p>原则上必须在<strong>引渡前</strong>完成所有权转移登记</p>
              </div>
              <div class="rule-item">
                <h4>✅ 例外情况</h4>
                <p>收到价款<strong>30%以下</strong>时，可保留所有权至收到<strong>超过30%</strong>的付款</p>
              </div>
            </div>
            <div class="calculation-example">
              <h4>例：价款3,000万円的情况</h4>
              <p>30% = 900万円 → 收到900万円以下时可保留所有权</p>
              <p>收到1,500万円时必须完成登记转移</p>
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
          <router-link to="/video?topic=seller-restrictions" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=seller-restrictions" class="action-button">
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
  { id: 'basic-concepts', title: '基本概念', icon: '📚' },
  { id: 'cooling-off', title: '冷静期制度', icon: '🔄' },
  { id: 'damage-compensation', title: '损害赔偿限制', icon: '⚖️' },
  { id: 'deposit-restrictions', title: '定金限制', icon: '💰' },
  { id: 'deposit-security', title: '定金保全', icon: '🔒' },
  { id: 'third-party-property', title: '他人物销售', icon: '🚫' },
  { id: 'non-conformity', title: '不适合责任', icon: '📝' },
  { id: 'installment-sales', title: '分期付款', icon: '💳' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '自ら売主制限（みずからうりぬしせいげん）',
    chinese: '自己作为卖主的限制',
    explanation: '宅建业者作为卖方时的特殊法律限制，共8种规制措施',
    example: '仅适用于卖方为业者、买方为非业者的情况'
  },
  {
    japanese: 'クーリング・オフ',
    chinese: '冷静期制度',
    explanation: '在特定条件下买方可无条件解除合同的权利',
    example: '在业者事务所以外场所签约时可行使'
  },
  {
    japanese: '手付金等（てつけきんとう）',
    chinese: '定金等款项',
    explanation: '契约缔结后、引渡前支付且充当价款的金钱',
    example: '包括定金、中间金等前期付款'
  },
  {
    japanese: '他人物売買（たにんぶつばいばい）',
    chinese: '他人物买卖',
    explanation: '销售非自己所有的不动产',
    example: '原则上禁止，需有取得保证方可销售'
  },
  {
    japanese: '割賦販売（かっぷはんばい）',
    chinese: '分期付款销售',
    explanation: '引渡后1年以上期间分2次以上支付价款的销售方式',
    example: '解除需30日以上书面催告'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者Ａが自ら売主として建物の売買契約を締結した。宅地建物取引業者である買主Ｄは、建物の物件の説明をＡの事務所で受けた。後日、Ａの事務所近くの喫茶店で買受けを申し込むとともに売買契約を締結した場合、Ｄは売買契約の解除はできる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '自ら売主制限仅适用于买方为非业者的情况。业者间交易不适用冷静期制度。'
  },
  {
    question: '宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者でないＢとの間で宅地の売買契約を締結した。Ｂが喫茶店で当該宅地の買受けの申込みをした場合において、ＡとＢとの間でクーリング・オフによる契約の解除をしない旨の合意をしたとき、Ｂがクーリング・オフにより契約の解除を行うことができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '违反冷静期制度规定且对买方不利的特约无效。买方仍可行使冷静期解除权。'
  },
  {
    question: '宅地建物取引業者A社が、自ら売主として宅地建物取引業者でない買主Bとの間における新築分譲マンションの売買契約（代金3,500万円）の締結に際して、当事者の債務の不履行を理由とする契約の解除に伴う損害賠償の予定額と違約金の合計額を700万円とする特約を定めることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '损害赔偿额预定和违约金合计不得超过价款的20%。3,500万円的20%为700万円，符合规定。'
  },
  {
    question: 'Aは、Bとの間で、Aが所有する建物を代金2,000万円で売却する売買契約（本件契約）を締結した。Aは宅地建物取引業者であるが、Bは宅地建物取引業者ではない場合において、Aは、本件契約の締結に際して、500万円の手付を受領したとしても、宅地建物取引業法の規定に違反しない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '定金金额不得超过价款的20%。2,000万円的20%为400万円，收取500万円违反规定。'
  },
  {
    question: '宅地建物取引業者Aが、自ら売主として、宅地建物取引業者でないBに自己の所有に属しない建物を売買する場合、Aが当該建物を取得する契約を締結している場合であっても、その契約が停止条件付きであるときは、当該建物の売買契約を締結してはならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '停止条件付契约在条件成就前不能保证取得，因此禁止销售他人物。'
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
  learningStore.recordTopicStudyTime('seller-restrictions', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('seller-restrictions')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('seller-restrictions')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('seller-restrictions', 0)
  
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
.seller-restrictions-page {
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

/* ========= 定义框样式 ========= */
.definition-box {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid #2a7960;
}

.definition-box p {
  margin: 0;
  font-weight: 600;
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

/* ========= 限制措施概览样式 ========= */
.restrictions-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.restriction-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.restriction-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.restriction-number {
  width: 40px;
  height: 40px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.restriction-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.restriction-content p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
}

/* ========= 冷静期制度样式 ========= */
.cooling-off-basics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.concept-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.concept-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.concept-item p {
  margin: 0;
  line-height: 1.6;
}

.applicable-conditions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.condition-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.condition-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.condition-type ul {
  padding-left: 1.25rem;
  margin: 0;
}

.condition-type li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.non-applicable-places {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.place-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.place-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.place-item p {
  margin: 0 0 0.5rem 0;
}

.note {
  font-size: 0.75rem;
  color: #6c757d;
  font-style: italic;
}

.cooling-off-expiration {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.expiration-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.expiration-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.expiration-item p {
  margin: 0 0 0.5rem 0;
  line-height: 1.6;
}

.cooling-off-procedure {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.procedure-step {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.procedure-step h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.procedure-step p, .procedure-step ul {
  margin: 0;
}

.procedure-step li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 损害赔偿限制样式 ========= */
.legal-provision {
  margin: 2rem 0;
}

.provision-box {
  background: #fff9e6;
  border: 1px solid #ffcc00;
  border-radius: 12px;
  padding: 1.5rem;
}

.provision-box.important {
  background: #ffe7e7;
  border-color: #dc3545;
}

.provision-box h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.provision-box p {
  margin: 0;
  line-height: 1.6;
}

.compensation-limits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.limit-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.limit-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.limit-item p {
  margin: 0;
  line-height: 1.6;
}

.practice-points {
  margin: 2rem 0;
}

.point-item {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  border: 1px solid #a8c6ff;
}

.point-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.calculation-example {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.calculation-example p {
  margin: 0.5rem 0;
}

/* ========= 定金限制样式 ========= */
.deposit-nature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.nature-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.nature-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.nature-item p {
  margin: 0;
  line-height: 1.6;
}

.special-agreement-validation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.agreement-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.agreement-item.valid {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.agreement-item.invalid {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.agreement-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.agreement-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.agreement-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.deposit-amount {
  margin: 2rem 0;
}

.amount-limit {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.amount-limit h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.amount-limit p {
  margin: 0;
  line-height: 1.6;
}

.amount-example {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  border: 1px solid #a8c6ff;
}

.amount-example h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.calculation {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.calculation p {
  margin: 0.5rem 0;
}

/* ========= 定金保全样式 ========= */
.deposit-definition {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  margin: 2rem 0;
}

.deposit-definition p {
  margin: 0 0 1rem 0;
}

.deposit-types {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.type-item {
  padding: 0.5rem 1rem;
  background: #e9f7f0;
  border-radius: 5px;
  border: 1px solid #2a7960;
  color: #2a7960;
  font-size: 0.875rem;
}

.security-measures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.measure-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  position: relative;
}

.measure-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.measure-type p {
  margin: 0;
  line-height: 1.6;
}

.note.limitation {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ffe7e7;
  color: #dc3545;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.property-type-security {
  margin: 2rem 0;
}

.security-exceptions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.exception-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.exception-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.exception-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.exception-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.buyer-rights {
  margin: 2rem 0;
}

.right-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.right-item.important {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.right-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.right-item p {
  margin: 0;
  line-height: 1.6;
}

/* ========= 他人物销售样式 ========= */
.basic-principle {
  margin: 2rem 0;
}

.principle-box {
  background: #ffe7e7;
  border: 1px solid #dc3545;
  border-radius: 12px;
  padding: 1.5rem;
}

.principle-box h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.principle-box p {
  margin: 0;
  line-height: 1.6;
}

.exceptions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.exception-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.exception-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.exception-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.exception-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.unfinished-property {
  margin: 2rem 0;
}

.property-rules {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.rule-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.rule-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.rule-item p, .rule-item ul {
  margin: 0;
}

.rule-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 契约不适合责任样式 ========= */
.civil-law, .real-estate-law {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.law-item, .restriction-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.law-item h4, .restriction-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.law-item ul, .restriction-item p {
  margin: 0;
}

.law-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.agreement-validation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.validation-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.validation-item.valid {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.validation-item.invalid {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.validation-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.validation-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.validation-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 分期付款样式 ========= */
.definition {
  margin: 2rem 0;
}

.cancellation-restrictions, .ownership-retention {
  margin: 2rem 0;
}

.retention-rules {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
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
  
  .restrictions-overview {
    grid-template-columns: 1fr;
  }
  
  .cooling-off-basics {
    grid-template-columns: 1fr;
  }
  
  .applicable-conditions {
    grid-template-columns: 1fr;
  }
  
  .non-applicable-places {
    grid-template-columns: 1fr;
  }
  
  .cooling-off-expiration {
    grid-template-columns: 1fr;
  }
  
  .cooling-off-procedure {
    grid-template-columns: 1fr;
  }
  
  .compensation-limits {
    grid-template-columns: 1fr;
  }
  
  .deposit-nature {
    grid-template-columns: 1fr;
  }
  
  .special-agreement-validation {
    grid-template-columns: 1fr;
  }
  
  .security-measures {
    grid-template-columns: 1fr;
  }
  
  .security-exceptions {
    grid-template-columns: 1fr;
  }
  
  .exceptions {
    grid-template-columns: 1fr;
  }
  
  .property-rules {
    grid-template-columns: 1fr;
  }
  
  .civil-law, .real-estate-law {
    grid-template-columns: 1fr;
  }
  
  .agreement-validation {
    grid-template-columns: 1fr;
  }
  
  .retention-rules {
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