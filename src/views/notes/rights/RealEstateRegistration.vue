<!-- src/views/notes/rights/RealEstateRegistration.vue -->
<template>
  <div class="real-estate-registration-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>不动产登记法</span>
        </div>
        <h1>不动产登记法</h1>
        <p>日本不动产登记制度，涉及登记记录构成、表题部与权利部区别、登记申请原则、假登记制度等重要内容</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">15</span>
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
            <li>理解不动产登记的基本概念和登记记录的构成</li>
            <li>掌握表题部和权利部的区别及其登记义务</li>
            <li>熟悉登记申请的原则和特殊情况的处理</li>
            <li>了解假登记的目的、效力和申请条件</li>
            <li>掌握所有权保存登记和移转登记的适用条件</li>
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
          <h2>1. 不动产登记的基本概念</h2>
          
          <h3>登记是什么？</h3>
          <div class="concept-explanation">
            <p>不动产登记就像不动产的"户口本"，记录了不动产的基本信息和权利归属。土地和建筑物被视为不同的不动产，分别有各自的登记记录。</p>
            
            <div class="example-box">
              <h4>📝 重要提醒</h4>
              <p>任何人在没有利害关系的情况下，也可以申请交付登記事項証明書，了解不动产的基本信息。</p>
            </div>
          </div>

          <h3>登记记录的构成</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">📋</div>
              <div class="timing-content">
                <h4>表题部</h4>
                <p>记录不动产的物理特征</p>
                <ul>
                  <li>土地：所在、地番、地目、地積等</li>
                  <li>建物：所在、家屋番号、种类、构造、床面积等</li>
                </ul>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">📑</div>
              <div class="timing-content">
                <h4>权利部</h4>
                <p>记录权利关系</p>
                <ul>
                  <li><strong>甲区：</strong>所有权相关事项</li>
                  <li><strong>乙区：</strong>所有权以外的权利（抵当权、贷借权等）</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>重要区别</h3>
          <div class="comparison-table">
            <div class="table-container">
              <table class="distinction-table">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>表题部</th>
                    <th>权利部</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>登记义务</strong></td>
                    <td class="has-obligation">有（1个月内）</td>
                    <td class="no-obligation">原则上无</td>
                  </tr>
                  <tr>
                    <td><strong>登记费用</strong></td>
                    <td class="free">原则上免费</td>
                    <td class="paid">需要费用</td>
                  </tr>
                  <tr>
                    <td><strong>对抗效力</strong></td>
                    <td class="no-effect">无对抗效力</td>
                    <td class="has-effect">有对抗效力</td>
                  </tr>
                  <tr>
                    <td><strong>登记官职权</strong></td>
                    <td class="can-do">可以职权登记</td>
                    <td class="cannot-do">不可职权登记</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 表题部登记 -->
        <section id="title-section" class="content-section">
          <h2>2. 表题部登记</h2>
          
          <h3>表题部的特征</h3>
          <div class="title-features">
            <div class="feature-item">
              <div class="feature-icon">⏰</div>
              <div class="feature-content">
                <h4>登记义务</h4>
                <p>新建、灭失、变更时<strong>1个月内</strong>必须申请</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">👨‍⚖️</div>
              <div class="feature-content">
                <h4>登记官职权</h4>
                <p>申请缺失时登记官可依职权登记</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💰</div>
              <div class="feature-content">
                <h4>免费登记</h4>
                <p>原则上不收取登记费用</p>
              </div>
            </div>
          </div>

          <h3>案例说明</h3>
          <div class="case-explanation">
            <div class="case-scenario">
              <h4>🏠 新建房屋登记案例</h4>
              <p>山田先生新建了一栋房子，必须在<strong>1个月内</strong>向登记所申请表题部登记，否则可能被处以罚款。登记官会记录房子的位置、结构、面积等信息。</p>
              
              <div class="registration-process">
                <div class="process-step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h5>房屋建成</h5>
                    <p>山田先生的新房建造完成</p>
                  </div>
                </div>
                <div class="process-step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h5>表题部登记申请</h5>
                    <p>1个月内向登记所申请</p>
                  </div>
                </div>
                <div class="process-step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h5>登记完成</h5>
                    <p>登记官记录房屋物理信息</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 权利部登记 -->
        <section id="rights-section" class="content-section">
          <h2>3. 权利部登记</h2>
          
          <h3>权利登记的流程</h3>
          <div class="rights-process">
            <div class="process-flow">
              <div class="flow-item">
                <div class="flow-icon">🏗️</div>
                <div class="flow-content">
                  <h4>所有权保存登记</h4>
                  <p>最初所有者进行的首次登记</p>
                </div>
                <div class="flow-arrow">→</div>
              </div>
              <div class="flow-item">
                <div class="flow-icon">🔄</div>
                <div class="flow-content">
                  <h4>所有权移转登记</h4>
                  <p>通过买卖等方式权利移转</p>
                </div>
                <div class="flow-arrow">→</div>
              </div>
              <div class="flow-item">
                <div class="flow-icon">📜</div>
                <div class="flow-content">
                  <h4>所有权移转登记</h4>
                  <p>通过相续等方式权利承继</p>
                </div>
              </div>
            </div>
          </div>

          <h3>所有权保存登记的申请人限制</h3>
          <div class="applicant-restrictions">
            <div class="restriction-item">
              <div class="restriction-icon">✅</div>
              <div class="restriction-content">
                <h4>可以申请的人员</h4>
                <ul>
                  <li>表题部所有者（开发商）</li>
                  <li>表题部所有者的相续人</li>
                  <li>确定判决确认所有权者</li>
                  <li>收用取得所有权者</li>
                  <li class="exception-item">*例外：区分建物的买主</li>
                </ul>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-icon">❌</div>
              <div class="restriction-content">
                <h4>不能申请的人员</h4>
                <ul>
                  <li>从表题部所有者取得所有权的一般买主</li>
                  <li>未经确认所有权的第三人</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>区分建物的特殊规则</h3>
          <div class="special-rules">
            <div class="rule-explanation">
              <p>为了避免开发商对每户进行所有权保存登记后再进行移转登记的繁琐程序，区分建物的买主可以直接进行所有权保存登记。</p>
              
              <div class="apartment-example">
                <div class="apartment-scenario">
                  <h4>🏢 公寓分譲案例</h4>
                  <div class="developer-approach">
                    <h5>传统做法（繁琐）</h5>
                    <p>开发商对101、102、103室分别进行所有权保存登记 → 与买主交易 → 分别进行所有权移转登记</p>
                  </div>
                  <div class="buyer-approach">
                    <h5>区分建物特例（简便）</h5>
                    <p>买主A、B、C直接从开发商取得所有权 → 各自进行所有权保存登记</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 登记申请原则 -->
        <section id="application-principles" class="content-section">
          <h2>4. 登记申请原则</h2>
          
          <h3>申请主义原则</h3>
          <div class="application-principle">
            <div class="principle-item">
              <div class="principle-icon">📝</div>
              <div class="principle-content">
                <h4>基本原则</h4>
                <p>基于当事人申请才进行登记</p>
              </div>
            </div>
            <div class="principle-item">
              <div class="principle-icon">⚖️</div>
              <div class="principle-content">
                <h4>例外情况</h4>
                <p>表题部登记可由登记官依职权进行</p>
              </div>
            </div>
          </div>

          <h3>共同申请原则</h3>
          <div class="joint-application">
            <div class="application-explanation">
              <p><strong>基本原则：</strong>登记权利者与登记义务者共同申请</p>
              <p><strong>目的：</strong>防止名义盗用和虚假登记</p>
              
              <div class="application-example">
                <div class="buyer-seller">
                  <div class="party seller">
                    <div class="party-icon">👨‍💼</div>
                    <div class="party-info">
                      <h5>登记义务者</h5>
                      <p>卖方（原所有者）</p>
                    </div>
                  </div>
                  <div class="joint-arrow">+</div>
                  <div class="party buyer">
                    <div class="party-icon">👩‍💼</div>
                    <div class="party-info">
                      <h5>登记权利者</h5>
                      <p>买方（新所有者）</p>
                    </div>
                  </div>
                  <div class="joint-arrow">→</div>
                  <div class="registration-result">
                    <div class="result-icon">🏛️</div>
                    <div class="result-info">
                      <h5>共同申请</h5>
                      <p>所有权移转登记</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>可以单独申请的情况</h3>
          <div class="single-application-cases">
            <div class="case-grid">
              <div class="case-item">
                <div class="case-number">1</div>
                <div class="case-content">
                  <h4>所有权保存登记</h4>
                  <p>新建不动产的首次登记</p>
                </div>
              </div>
              <div class="case-item">
                <div class="case-number">2</div>
                <div class="case-content">
                  <h4>名义人变更登记</h4>
                  <p>姓名・住所变更登记</p>
                </div>
              </div>
              <div class="case-item">
                <div class="case-number">3</div>
                <div class="case-content">
                  <h4>相续或合併登记</h4>
                  <p>因继承或合并的权利移转</p>
                </div>
              </div>
              <div class="case-item">
                <div class="case-number">4</div>
                <div class="case-content">
                  <h4>遗赠所有权移转</h4>
                  <p>对相续人的遗赠</p>
                </div>
              </div>
              <div class="case-item">
                <div class="case-number">5</div>
                <div class="case-content">
                  <h4>确定判决登记</h4>
                  <p>法院判决命令的登记</p>
                </div>
              </div>
              <div class="case-item">
                <div class="case-number">6</div>
                <div class="case-content">
                  <h4>假登记</h4>
                  <p>假登记义务者承诺时</p>
                </div>
              </div>
            </div>
          </div>

          <h3>代理登记的特殊规则</h3>
          <div class="proxy-registration">
            <div class="proxy-rule">
              <div class="rule-icon">⚡</div>
              <div class="rule-content">
                <h4>重要例外</h4>
                <p>即使本人死亡，登记申请的代理权也不消灭</p>
                <div class="rule-note">
                  <p>这是为了防止代理权滥用的特殊规定</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 假登记制度 -->
        <section id="provisional-registration" class="content-section">
          <h2>5. 假登记制度</h2>
          
          <h3>假登记的目的</h3>
          <div class="provisional-purpose">
            <div class="purpose-item">
              <div class="purpose-icon">📅</div>
              <div class="purpose-content">
                <h4>保全登记顺位</h4>
                <p>在条件不成熟时预先登记，保全未来登记的顺位</p>
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">⏳</div>
              <div class="purpose-content">
                <h4>临时性登记</h4>
                <p>在正式登记条件未满足时的临时措施</p>
              </div>
            </div>
          </div>

          <h3>假登记的效力</h3>
          <div class="provisional-effect">
            <div class="effect-item">
              <div class="effect-icon">🚫</div>
              <div class="effect-content">
                <h4>假登记本身</h4>
                <p><strong>没有对抗力</strong></p>
              </div>
            </div>
            <div class="effect-item">
              <div class="effect-icon">✅</div>
              <div class="effect-content">
                <h4>转为本登记时</h4>
                <p><strong>顺位追溯到假登记时</strong></p>
              </div>
            </div>
          </div>

          <h3>假登记的申请</h3>
          <div class="provisional-application">
            <div class="application-types">
              <div class="type-item">
                <div class="type-icon">👥</div>
                <div class="type-content">
                  <h4>原则：共同申请</h4>
                  <p>登记权利者与登记义务者共同申请</p>
                </div>
              </div>
              <div class="type-item">
                <div class="type-icon">👤</div>
                <div class="type-content">
                  <h4>例外：单独申请</h4>
                  <p>假登记义务者承诺时，可单独申请</p>
                </div>
              </div>
            </div>
          </div>

          <h3>假登记转为本登记的条件</h3>
          <div class="conversion-conditions">
            <div class="condition-warning">
              <div class="warning-icon">⚠️</div>
              <div class="warning-content">
                <h4>重要限制</h4>
                <p>所有权相关的假登记转为本登记时，需要有利害关系第三者的承诺。</p>
              </div>
            </div>
          </div>

          <h3>假登记的抹消</h3>
          <div class="provisional-cancellation">
            <div class="cancellation-methods">
              <div class="method-item">
                <div class="method-icon">👤</div>
                <div class="method-content">
                  <h4>单独申请</h4>
                  <p>假登记名义人可单独申请抹消</p>
                </div>
              </div>
              <div class="method-item">
                <div class="method-icon">🤝</div>
                <div class="method-content">
                  <h4>承诺后单独申请</h4>
                  <p>得到假登记名义人承诺时，利害关系人也可单独申请抹消</p>
                </div>
              </div>
            </div>
          </div>

          <h3>案例故事</h3>
          <div class="provisional-case">
            <div class="case-timeline">
              <div class="timeline-event">
                <div class="event-date">8月1日</div>
                <div class="event-content">
                  <h5>买卖预约</h5>
                  <p>A与B签订买卖预约，B做了假登记</p>
                </div>
              </div>
              <div class="timeline-event problematic">
                <div class="event-date">8月5日</div>
                <div class="event-content">
                  <h5>二重买卖</h5>
                  <p>A将不动产卖给C，C做了本登记</p>
                </div>
              </div>
              <div class="timeline-event solution">
                <div class="event-date">8月10日</div>
                <div class="event-content">
                  <h5>假登记转本登记</h5>
                  <p>B将假登记转为本登记（需要C的承诺）</p>
                  <div class="result">
                    <strong>结果：</strong>B的登记顺位追溯到8月1日，优先于C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 登记记录实例 -->
        <section id="registration-examples" class="content-section">
          <h2>6. 登记记录的实例解析</h2>
          
          <h3>表题部实例</h3>
          <div class="registration-examples">
            <div class="example-item">
              <h4>土地表题部</h4>
              <div class="registration-table">
                <table>
                  <tr>
                    <th>项目</th>
                    <th>内容</th>
                  </tr>
                  <tr>
                    <td>所在</td>
                    <td>品川区八潮一丁目</td>
                  </tr>
                  <tr>
                    <td>地番</td>
                    <td>1番</td>
                  </tr>
                  <tr>
                    <td>地目</td>
                    <td>宅地</td>
                  </tr>
                  <tr>
                    <td>地積</td>
                    <td>532.43㎡</td>
                  </tr>
                  <tr>
                    <td>所有者</td>
                    <td>千代田区三崎町一丁目1番1号 山中五郎</td>
                  </tr>
                </table>
              </div>
            </div>
            
            <div class="example-item">
              <h4>建物表题部</h4>
              <div class="registration-table">
                <table>
                  <tr>
                    <th>项目</th>
                    <th>内容</th>
                  </tr>
                  <tr>
                    <td>种类</td>
                    <td>居宅</td>
                  </tr>
                  <tr>
                    <td>构造</td>
                    <td>铁筋混凝土造</td>
                  </tr>
                  <tr>
                    <td>床面积</td>
                    <td>1阶290.02㎡，2阶283.62㎡</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <h3>权利部实例</h3>
          <div class="rights-examples">
            <div class="example-item">
              <h4>权利部甲区（所有权相关）</h4>
              <div class="registration-table">
                <table>
                  <tr>
                    <th>顺位番号</th>
                    <th>登记目的</th>
                    <th>权利者</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>所有权保存</td>
                    <td>山中五郎</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>所有权移转</td>
                    <td>川上清（通过买卖）</td>
                  </tr>
                </table>
              </div>
            </div>
            
            <div class="example-item">
              <h4>权利部乙区（所有权以外）</h4>
              <div class="registration-table">
                <table>
                  <tr>
                    <th>顺位番号</th>
                    <th>登记目的</th>
                    <th>权利内容</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>抵当权设定</td>
                    <td>债权额300万円，债务者山下五郎</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>贷借权设定</td>
                    <td>贷料月20万円，存续期间10年</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>抵当权抹消</td>
                    <td>因弁済而抹消</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- 实务注意事项 -->
        <section id="practical-notes" class="content-section">
          <h2>7. 实务注意事项</h2>
          
          <h3>表题部所有者的重要性</h3>
          <div class="practical-notes">
            <div class="note-item">
              <div class="note-icon">👑</div>
              <div class="note-content">
                <h4>原始所有者</h4>
                <p>表题部所有者是不动产的"原始所有者"</p>
              </div>
            </div>
            <div class="note-item">
              <div class="note-icon">🔑</div>
              <div class="note-content">
                <h4>登记权限</h4>
                <p>只有表题部所有者及其相续人可以进行所有权保存登记</p>
              </div>
            </div>
            <div class="note-item">
              <div class="note-icon">⚠️</div>
              <div class="note-content">
                <h4>登记准确性</h4>
                <p>表题部登记错误会影响后续权利登记</p>
              </div>
            </div>
          </div>

          <h3>登记识别情报制度</h3>
          <div class="identification-system">
            <div class="system-features">
              <div class="feature-item">
                <h4>🔒 12位识别码</h4>
                <p>类似密码的12位识别码</p>
              </div>
              <div class="feature-item">
                <h4>🤫 保密性</h4>
                <p>只有登记名义人知道</p>
              </div>
              <div class="feature-item">
                <h4>🛡️ 安全防护</h4>
                <p>用于防止虚假登记</p>
              </div>
            </div>
          </div>

          <h3>登记官事前通知制度</h3>
          <div class="prior-notification">
            <div class="notification-process">
              <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h5>申请提交</h5>
                  <p>申请人有正当理由不能提供登记识别情报</p>
                </div>
              </div>
              <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h5>登记官确认</h5>
                  <p>登记前向登记义务者本人确认申请真实性</p>
                </div>
              </div>
              <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h5>登记执行</h5>
                  <p>确认无误后进行登记</p>
                </div>
              </div>
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
          <router-link to="/video?topic=real-estate-registration" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=real-estate-registration" class="action-button">
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
  { id: 'title-section', title: '表题部登记', icon: '📋' },
  { id: 'rights-section', title: '权利部登记', icon: '📑' },
  { id: 'application-principles', title: '登记申请原则', icon: '📝' },
  { id: 'provisional-registration', title: '假登记制度', icon: '⏳' },
  { id: 'registration-examples', title: '登记记录实例', icon: '🏛️' },
  { id: 'practical-notes', title: '实务注意事项', icon: '💼' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '表題部（ひょうだいぶ）',
    chinese: '表题部',
    explanation: '记录不动产物理状况的部分，包括位置、面积、结构等信息',
    example: '土地的地番、地目、地積；建物的种类、构造、床面积'
  },
  {
    japanese: '権利部（けんりぶ）',
    chinese: '权利部',
    explanation: '记录不动产权利关系的部分，分为甲区（所有权）和乙区（所有权以外的权利）',
    example: '所有权保存登记、抵当权设定登记'
  },
  {
    japanese: '仮登記（かりとうき）',
    chinese: '假登记（临时登记）',
    explanation: '在条件不成熟时预先保全登记顺位的临时性登记',
    example: '买卖预约后进行的假登记，待正式契约后转为本登记'
  },
  {
    japanese: '所有権保存登記（しょゆうけんほぞんとうき）',
    chinese: '所有权保存登记',
    explanation: '对新建不动产进行的首次所有权登记',
    example: '开发商对新建成公寓进行的首次所有权登记'
  },
  {
    japanese: '共同申請主義（きょうどうしんせいしゅぎ）',
    chinese: '共同申请原则',
    explanation: '登记申请原则上需要登记权利者和登记义务者共同提出',
    example: '不动产买卖时，卖方和买方共同申请所有权移转登记'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '新築した建物又は区分建物以外の表題登記がない建物の所有権を取得した者は、その所有権の取得の日から1月以内に、所有権の保存の登記を申請しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '所有权保存登记属于权利部登记，原则上没有申请义务。表题部登记才有1个月内的申请义务。'
  },
  {
    question: '表題部に所有者として記録されている者の相続人は、所有権の保存の登記を申請することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '表题部所有者的相续人可以进行所有权保存登记，这是所有权保存登记申请人的例外情况之一。'
  },
  {
    question: '仮登記の抹消は、登記権利者及び登記義務者が共同してしなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '假登记的抹消可以由假登记名义人单独申请，或者得到其承诺时由利害关系人单独申请。'
  },
  {
    question: '登記の申請を代理人に委任した場合、本人が死亡しても代理権は消滅しない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '登记申请的代理权在本人死亡时也不消灭，这是为了防止代理权滥用的特殊规定。'
  },
  {
    question: '区分建物の場合、表題部所有者から所有権を取得した者は所有権保存登記を申請することができない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '区分建物是例外情况，从表题部所有者取得所有权的买主也可以进行所有权保存登记。'
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
  learningStore.recordTopicStudyTime('real-estate-registration', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('real-estate-registration')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('real-estate-registration')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('real-estate-registration', 0)
  
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
.real-estate-registration-page {
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
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
  margin: 0 0 0.5rem 0;
  color: #6c757d;
}

.timing-content ul {
  padding-left: 1rem;
  margin: 0;
}

.timing-content li {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

/* ========= 比较表格样式 ========= */
.comparison-table {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
}

.distinction-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.distinction-table th, .distinction-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.distinction-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.distinction-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.has-obligation, .free, .no-effect, .can-do {
  font-weight: bold;
}

.has-obligation {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
}

.no-obligation {
  background-color: #fff9e6 !important;
  color: #e65100;
}

.free {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
}

.paid {
  background-color: #ffe7e7 !important;
  color: #c62828;
}

.no-effect {
  background-color: #ffe7e7 !important;
  color: #c62828;
}

.has-effect {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
}

.can-do {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
}

.cannot-do {
  background-color: #ffe7e7 !important;
  color: #c62828;
}

/* ========= 表题部登记样式 ========= */
.title-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.feature-content p {
  margin: 0;
  color: #6c757d;
}

.case-explanation {
  margin: 2rem 0;
}

.case-scenario {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.case-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.registration-process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.process-step {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 0.5rem;
}

.process-step h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.process-step p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 权利部登记样式 ========= */
.rights-process {
  margin: 1.5rem 0;
}

.process-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  flex: 1;
  min-width: 200px;
}

.flow-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.flow-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.flow-content p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
}

.flow-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.applicant-restrictions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.restriction-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.restriction-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.restriction-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.restriction-content ul {
  padding-left: 1rem;
  margin: 0;
}

.restriction-content li {
  margin-bottom: 0.5rem;
}

.exception-item {
  color: #2a7960;
  font-weight: bold;
}

.special-rules {
  margin: 2rem 0;
}

.rule-explanation {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.apartment-example {
  margin-top: 1.5rem;
}

.apartment-scenario {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.apartment-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.developer-approach, .buyer-approach {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.developer-approach {
  background: #fff9e6;
  border-left: 3px solid #ffcc00;
}

.buyer-approach {
  background: #e7f7e7;
  border-left: 3px solid #2e7d32;
}

.developer-approach h5, .buyer-approach h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

/* ========= 登记申请原则样式 ========= */
.application-principle, .joint-application {
  margin: 1.5rem 0;
}

.principle-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.principle-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.principle-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.principle-content p {
  margin: 0;
  color: #6c757d;
}

.application-explanation {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.application-example {
  margin-top: 1.5rem;
}

.buyer-seller {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.party, .registration-result {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  min-width: 120px;
}

.party-icon, .result-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.party-info h5, .result-info h5 {
  margin: 0 0 0.25rem 0;
  color: #1a472a;
}

.party-info p, .result-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.joint-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.single-application-cases {
  margin: 2rem 0;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.case-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.case-number {
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

.case-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.case-content p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
}

.proxy-registration {
  margin: 2rem 0;
}

.proxy-rule {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border-left: 4px solid #ffcc00;
}

.rule-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.rule-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.rule-content p {
  margin: 0 0 1rem 0;
}

.rule-note {
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 假登记制度样式 ========= */
.provisional-purpose, .provisional-effect, .provisional-application {
  margin: 1.5rem 0;
}

.purpose-item, .effect-item, .type-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.purpose-icon, .effect-icon, .type-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.purpose-content h4, .effect-content h4, .type-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.purpose-content p, .effect-content p, .type-content p {
  margin: 0;
  color: #6c757d;
}

.conversion-conditions, .provisional-cancellation {
  margin: 2rem 0;
}

.condition-warning {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #ffe7e7;
  border-radius: 8px;
  border-left: 4px solid #c62828;
}

.warning-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.warning-content h4 {
  margin: 0 0 0.5rem 0;
  color: #c62828;
}

.warning-content p {
  margin: 0;
}

.cancellation-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.method-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.method-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.method-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.method-content p {
  margin: 0;
  color: #6c757d;
}

.provisional-case {
  margin: 2rem 0;
}

.case-timeline {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.timeline-event {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 3px solid #2a7960;
}

.timeline-event.problematic {
  border-left-color: #c62828;
}

.timeline-event.solution {
  border-left-color: #2e7d32;
}

.event-date {
  font-weight: bold;
  color: #2a7960;
  min-width: 80px;
}

.event-content h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.event-content p {
  margin: 0 0 0.5rem 0;
}

.result {
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
  font-weight: bold;
  color: #2e7d32;
}

/* ========= 登记记录实例样式 ========= */
.registration-examples, .rights-examples {
  margin: 1.5rem 0;
}

.example-item {
  margin-bottom: 2rem;
}

.example-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.registration-table {
  overflow-x: auto;
}

.registration-table table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.registration-table th, .registration-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: left;
}

.registration-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.registration-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

/* ========= 实务注意事项样式 ========= */
.practical-notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.note-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.note-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.note-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.note-content p {
  margin: 0;
  color: #6c757d;
}

.identification-system {
  margin: 2rem 0;
}

.system-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.feature-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.feature-item p {
  margin: 0;
  color: #6c757d;
}

.prior-notification {
  margin: 2rem 0;
}

.notification-process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.process-step {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 0.5rem;
}

.process-step h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.process-step p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
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
  
  .title-features {
    grid-template-columns: 1fr;
  }
  
  .registration-process {
    grid-template-columns: 1fr;
  }
  
  .process-flow {
    flex-direction: column;
  }
  
  .flow-item {
    width: 100%;
  }
  
  .flow-arrow {
    display: none;
  }
  
  .applicant-restrictions {
    grid-template-columns: 1fr;
  }
  
  .case-grid {
    grid-template-columns: 1fr;
  }
  
  .buyer-seller {
    flex-direction: column;
  }
  
  .joint-arrow {
    transform: rotate(90deg);
  }
  
  .cancellation-methods {
    grid-template-columns: 1fr;
  }
  
  .system-features {
    grid-template-columns: 1fr;
  }
  
  .notification-process {
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