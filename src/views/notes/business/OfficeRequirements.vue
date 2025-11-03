<!-- src/views/notes/yefa/OfficeRequirements.vue -->
<template>
  <div class="office-requirements">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>事务所规定</span>
        </div>
        <h1>事务所规定</h1>
        <p>宅建业法中关于事务所设置、5点set要求及最新法改正内容的完整解析</p>
        
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
            <span class="stat-number">4</span>
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
            <li>理解事务所的定义、分类及其法律意义</li>
            <li>掌握事务所必须配备的"5点set"及其具体要求</li>
            <li>熟悉从业者名簿、账簿、成年专任宅建士的设置与保存规则</li>
            <li>了解标识和报酬额揭示的法定要求及案内所的特殊规定</li>
            <li>掌握2025年法改正对事务所相关规定的变更</li>
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

        <!-- 事务所定义与分类 -->
        <section id="office-definition" class="content-section">
          <h2>1. 事务所的定义与分类</h2>
          
          <h3>事务所的基本概念</h3>
          <p><strong>事务所</strong>是宅建业者进行宅建业务的场所，包括本店、支店以及其他可以持续进行业务的设施[citation:1]。判断一个场所是否为事务所，关键在于是否具备持续进行业务的能力和是否有具备契约缔结权限的使用人。</p>
          
          <div class="highlight-box">
            <strong>核心判断标准：</strong>
            <ul>
              <li><strong>持续业务能力</strong>：具备持续进行宅建业务的条件和设施</li>
              <li><strong>权限人员配置</strong>：配备有契约缔结权限的使用人（如店长、支店长）</li>
              <li><strong>业务实质</strong>：实际从事或能够从事宅建业务</li>
            </ul>
          </div>

          <h3>事务所的分类</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>类型</th>
                  <th>定义</th>
                  <th>是否属于事务所</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>本店（主たる事務所）</strong></td>
                  <td>主要的事务所，公司总部</td>
                  <td class="required">属于事务所</td>
                  <td>无论是否从事宅建业，都视为事务所[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>支店（従たる事務所）</strong></td>
                  <td>分支机构</td>
                  <td class="required">属于事务所</td>
                  <td>只有从事宅建业时才算是事务所[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>持续业务设施</strong></td>
                  <td>现地案内所、样板房等</td>
                  <td class="required">属于事务所</td>
                  <td>配备有契约缔结权限的店长时视为事务所[citation:1]</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="case-scenario">
            <strong>实务案例：</strong>
            A公司在东京设本店从事建设业，在大阪设支店从事宅建业，在名古屋设现地案内所（配备有契约权限的店长）。<br>
            <strong>事务所数量：</strong>3个（本店虽然不从事宅建业但仍算事务所；支店从事宅建业；案内所配备权限人员）
          </div>
        </section>

        <!-- 事务所5点set -->
        <section id="five-points-set" class="content-section">
          <h2>2. 事务所的5点set要求</h2>
          
          <p>每个事务所必须独立配备以下五项内容，不可相互替代，也不可只在主事务所统一配备[citation:1]。</p>

          <div class="five-points-diagram">
            <div class="point-item">
              <div class="point-number">①</div>
              <div class="point-content">
                <h3>从业者名簿</h3>
                <p>记载从业者信息的簿册</p>
              </div>
            </div>
            <div class="point-item">
              <div class="point-number">②</div>
              <div class="point-content">
                <h3>账簿</h3>
                <p>记录交易信息的簿册</p>
              </div>
            </div>
            <div class="point-item">
              <div class="point-number">③</div>
              <div class="point-content">
                <h3>成年专任宅建士</h3>
                <p>专职的成年宅建士</p>
              </div>
            </div>
            <div class="point-item">
              <div class="point-number">④</div>
              <div class="point-content">
                <h3>报酬额揭示</h3>
                <p>公示报酬标准</p>
              </div>
            </div>
            <div class="point-item">
              <div class="point-number">⑤</div>
              <div class="point-content">
                <h3>标识</h3>
                <p>法定标牌公示</p>
              </div>
            </div>
          </div>

          <div class="highlight-box">
            <strong>重要原则：</strong>
            "5点set必须在<strong>每个事务所单独设置</strong>，不可只在主事务所统一配备。未设置或设置不完整将面临处罚。"
          </div>
        </section>

        <!-- 从业者名簿 -->
        <section id="employee-register" class="content-section">
          <h2>3. 从业者名簿（2025年法改正）</h2>
          
          <h3>基本要求</h3>
          <ul>
            <li><strong>设置要求</strong>：每个事务所必须配备从业者名簿</li>
            <li><strong>形式</strong>：可以是电子版[citation:1]</li>
            <li><strong>范围</strong>：包含代表者和暂时的事务辅助者</li>
          </ul>

          <h3>记载内容（2025年法改正后）</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>记载事项</th>
                  <th>改正前</th>
                  <th>改正后（2025年4月1日施行）</th>
                  <th>改正理由</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>姓名</strong></td>
                  <td class="required">必须记载</td>
                  <td class="required">必须记载</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><strong>住所</strong></td>
                  <td class="required">必须记载</td>
                  <td class="not-required">不需要记载[citation:1][citation:9]</td>
                  <td rowspan="3">保护从业者隐私，从业者名簿可能被交易关系者查阅[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>生年月日</strong></td>
                  <td class="required">必须记载</td>
                  <td class="not-required">不需要记载[citation:1][citation:9]</td>
                </tr>
                <tr>
                  <td><strong>性别</strong></td>
                  <td class="required">必须记载</td>
                  <td class="not-required">不需要记载[citation:10]</td>
                </tr>
                <tr>
                  <td><strong>入职/离职时间</strong></td>
                  <td class="required">必须记载</td>
                  <td class="required">必须记载</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><strong>从业者证明书番号</strong></td>
                  <td class="required">必须记载</td>
                  <td class="required">必须记载</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><strong>是否为宅建士</strong></td>
                  <td class="required">必须记载</td>
                  <td class="required">必须记载</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>其他规定</h3>
          <ul>
            <li><strong>保存期间</strong>：自最终记载日起<strong>10年</strong>[citation:1]</li>
            <li><strong>阅览义务</strong>：交易关系者请求查阅时必须提供[citation:1]</li>
            <li><strong>罚则</strong>：未配备、虚假记载或未记载必要事项，处以<strong>50万日元</strong>罚金[citation:1]</li>
            <li><strong>携带义务</strong>：从业者必须携带从业者证明书，被请求时必须提示（宅建士证不可替代）[citation:1]</li>
          </ul>
        </section>

        <!-- 账簿 -->
        <section id="account-book" class="content-section">
          <h2>4. 账簿</h2>
          
          <h3>基本要求</h3>
          <ul>
            <li><strong>设置要求</strong>：每个事务所必须配备账簿[citation:1]</li>
            <li><strong>形式</strong>：可以是电子版，但需能随时打印[citation:1]</li>
          </ul>

          <h3>记载内容</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>记载事项</th>
                  <th>具体内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>交易年月日</strong></td>
                  <td>交易发生的具体日期</td>
                </tr>
                <tr>
                  <td><strong>宅地建物所在地</strong></td>
                  <td>交易对象的具体位置</td>
                </tr>
                <tr>
                  <td><strong>面积</strong></td>
                  <td>交易对象的面积信息</td>
                </tr>
                <tr>
                  <td><strong>交易样态</strong></td>
                  <td>买卖、交换、租赁等交易类型</td>
                </tr>
                <tr>
                  <td><strong>交易对象姓名、住所</strong></td>
                  <td>交易对方的个人信息</td>
                </tr>
                <tr>
                  <td><strong>交易金额</strong></td>
                  <td>交易的具体金额</td>
                </tr>
                <tr>
                  <td><strong>报酬额</strong></td>
                  <td>收取的报酬金额</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>保存期间与阅览</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>项目</th>
                  <th>规定</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>作成要求</strong></td>
                  <td>每个事业年度作成</td>
                  <td>各公司事业年度不同</td>
                </tr>
                <tr>
                  <td><strong>闭锁</strong></td>
                  <td>事业年度最后一天闭锁</td>
                  <td>如A公司事业年度1月1日-12月31日，12月31日为闭锁日</td>
                </tr>
                <tr>
                  <td><strong>保存期间（原则）</strong></td>
                  <td>闭锁后<strong>5年</strong></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><strong>保存期间（例外）</strong></td>
                  <td><strong>10年</strong></td>
                  <td>业者自己作为卖主时的新筑住宅（自ら売主の新築住宅）[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>阅览义务</strong></td>
                  <td class="not-required">无义务提供阅览</td>
                  <td>涉及商业秘密[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>罚则</strong></td>
                  <td>50万日元罚金</td>
                  <td>未配备、未记载必要事项、虚假记载[citation:1]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 成年专任宅建士 -->
        <section id="exclusive-takken" class="content-section">
          <h2>5. 成年专任宅建士</h2>
          
          <h3>设置要求</h3>
          <ul>
            <li><strong>比例要求</strong>：每<strong>5个</strong>工作人员中必须配备<strong>1个</strong>成年专任宅建士[citation:1]</li>
            <li><strong>补足期限</strong>：人数不足时需在<strong>2周内</strong>补足，否则停业[citation:1]</li>
            <li><strong>专任含义</strong>：在事务所常勤，专职从事宅建业（允许IT环境下远程办公）[citation:1]</li>
          </ul>

          <div class="case-scenario">
            <strong>实务案例：</strong>
            公司有5名工作人员，其中1名宅建士突然辞职。<br>
            <strong>应对措施：</strong>必须在<strong>2周内</strong>补足新的宅建士，否则不能继续营业。
          </div>

          <h3>特殊场所要求</h3>
          <p>进行建物宅地的分让（分割、让渡），或在进行媒介代理的案内所、展会里，契约缔结、契约申请时，必须配备成年专任宅建士[citation:1]。设置该案内所的宅建业者有配备义务。</p>

          <h3>特殊规定</h3>
          <ul>
            <li>宅建业者（法人的情况下为其役员）是宅建士时，在其主要从事业务的事务所，视为成年专任宅建士[citation:1]</li>
            <li>从业者8人的情况下，至少需要2名宅建士[citation:1]</li>
          </ul>
        </section>

        <!-- 报酬额揭示 -->
        <section id="reward-disclosure" class="content-section">
          <h2>6. 报酬额揭示</h2>
          
          <h3>基本要求</h3>
          <ul>
            <li><strong>揭示场所</strong>：每个事务所的<strong>明显地方</strong></li>
            <li><strong>揭示内容</strong>：国土交通大臣制定的报酬额（做一单最多能收多少钱）[citation:1]</li>
            <li><strong>例外</strong>：<strong class="not-required">案内所不需要揭示报酬额</strong>[citation:1]</li>
          </ul>

          <div class="highlight-box">
            <strong>实务理解：</strong>
            "报酬额揭示就像餐厅的菜单价格表，让消费者清楚知道服务的收费标准，避免纠纷。"
          </div>
        </section>

        <!-- 标识 -->
        <section id="identification-sign" class="content-section">
          <h2>7. 标识（2025年法改正）</h2>
          
          <h3>基本要求</h3>
          <ul>
            <li><strong>揭示场所</strong>：每个事务所的<strong>显眼地方</strong></li>
            <li><strong>尺寸要求</strong>：<strong>35cm以上</strong>[citation:1]</li>
            <li><strong>性质</strong>：宅建业者自己作成，与免许证不同[citation:1]</li>
          </ul>

          <h3>标识记载内容（2025年法改正后）</h3>
          <div class="sign-example">
            <div class="sign-header">宅地建物取引業者票</div>
            <div class="sign-content">
              <div class="sign-row">
                <span class="sign-label">免許証番号</span>
                <span class="sign-value">国土交通大臣（ ）第 号</span>
              </div>
              <div class="sign-row">
                <span class="sign-label">免許有効期間</span>
                <span class="sign-value">年 月 日から 年 月 日まで</span>
              </div>
              <div class="sign-row">
                <span class="sign-label">商号又は名称</span>
                <span class="sign-value"></span>
              </div>
              <div class="sign-row">
                <span class="sign-label">代表者氏名</span>
                <span class="sign-value"></span>
              </div>
              <div class="sign-row">
                <span class="sign-label">この事務所の代表者氏名</span>
                <span class="sign-value"></span>
              </div>
              <div class="sign-row highlight-row">
                <span class="sign-label">専任宅建士の人数</span>
                <span class="sign-value">（宅地建物取引業に従事する者の数 人）</span>
              </div>
              <div class="sign-row">
                <span class="sign-label">主たる事務所の所在地</span>
                <span class="sign-value">電話番号（ ）</span>
              </div>
            </div>
          </div>

          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>记载事项</th>
                  <th>改正前</th>
                  <th>改正后（2025年4月1日施行）</th>
                  <th>改正理由</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>专任宅建士的氏名</strong></td>
                  <td class="required">必须记载</td>
                  <td class="not-required">不需要记载[citation:1][citation:9]</td>
                  <td rowspan="2">保护个人隐私，突出实务相关信息[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>专任宅建士的人数</strong></td>
                  <td class="not-required">不需要记载</td>
                  <td class="required">必须记载[citation:1][citation:9]</td>
                </tr>
                <tr>
                  <td><strong>事务所的代表者氏名</strong></td>
                  <td class="not-required">不需要记载</td>
                  <td class="required">必须记载[citation:1][citation:9]</td>
                  <td>明确责任所在</td>
                </tr>
                <tr>
                  <td><strong>从业者数</strong></td>
                  <td class="not-required">不需要记载</td>
                  <td class="required">必须记载[citation:1]</td>
                  <td>反映业务规模</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>特殊场所的标识义务</h3>
          <ul>
            <li><strong>分让楼盘所在地</strong>：进行宅地建物分让的宅建业者，必须在宅地建物的所在地揭示标识[citation:1]</li>
            <li><strong>案内所</strong>：设置案内所的业者，必须在案内所里设置标识[citation:1]</li>
            <li><strong>展会等场所</strong>：宅建业者在展会等类似场所也要揭示标识[citation:1]</li>
          </ul>

          <div class="case-scenario">
            <strong>开发商委托销售案例：</strong>
            开发商（卖主业者A）委托业者B销售楼盘。<br>
            <strong>标识义务：</strong>
            <ul>
              <li>卖主业者A有义务在物件现地挂A的标识</li>
              <li>业者B有义务在案内所挂B的标识，且标识中需记载卖主A的商号名称和免许证番号</li>
            </ul>
          </div>
        </section>

        <!-- 案内所特殊规定 -->
        <section id="information-office" class="content-section">
          <h2>8. 案内所的特殊规定</h2>
          
          <h3>案内所的定义</h3>
          <p>契约缔结案内所、契约申请案内所，如售楼处、展会场所等[citation:1]。</p>

          <h3>与事务所的区别</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>项目</th>
                  <th>事务所</th>
                  <th>案内所</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>报酬额揭示</strong></td>
                  <td class="required">必须揭示</td>
                  <td class="not-required">不需要揭示[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>标识记载</strong></td>
                  <td>记载本事务所信息</td>
                  <td>需记载设置业者信息+卖主信息[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>宅建士配备</strong></td>
                  <td class="required">必须配备</td>
                  <td class="required">进行分让或媒介时必须配备[citation:1]</td>
                </tr>
                <tr>
                  <td><strong>5点set</strong></td>
                  <td class="required">必须完整配备</td>
                  <td class="required">必须完整配备（除报酬额）</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 2025年法改正总结 -->
        <section id="legal-reform" class="content-section">
          <h2>9. 2025年法改正要点总结</h2>
          
          <div class="reform-timeline">
            <div class="reform-item">
              <div class="reform-date">2025年1月1日</div>
              <div class="reform-content">
                <h4>指定流通机构（REINS）登记事项强化[citation:1][citation:5]</h4>
                <ul>
                  <li>追加"交易申请受理状况"登记义务</li>
                  <li>防止"围标"行为，确保交易透明度</li>
                  <li>虚假登记将受监督处分</li>
                </ul>
              </div>
            </div>
            <div class="reform-item">
              <div class="reform-date">2025年4月1日</div>
              <div class="reform-content">
                <h4>事务所相关记载事项简化[citation:1][citation:9][citation:10]</h4>
                <ul>
                  <li><strong>从业者名簿</strong>：住所、生年月日、性别不再需要记载</li>
                  <li><strong>宅建业者名簿</strong>：专任宅建士氏名不再需要记载</li>
                  <li><strong>标识</strong>：专任宅建士氏名改为记载人数，追加事务所代表者氏名</li>
                </ul>
              </div>
            </div>
            <div class="reform-item">
              <div class="reform-date">令和6年5月25日</div>
              <div class="reform-content">
                <h4>国土交通大臣免许申请简化[citation:3][citation:7]</h4>
                <ul>
                  <li>申请不再经由都道府县知事，直接向地方整备局申请</li>
                  <li>案内所等届出也直接向地方整备局提出</li>
                  <li>手续简化，处理效率提高</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="highlight-box">
            <strong>法改正核心目的：</strong>
            <ul>
              <li><strong>保护个人隐私</strong>：减少个人敏感信息记载</li>
              <li><strong>简化行政手续</strong>：提高业务效率</li>
              <li><strong>强化交易透明度</strong>：防止不正当行为</li>
            </ul>
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
          <router-link to="/video?topic=office-requirements" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=office-requirements" class="action-button">
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
  { id: 'office-definition', title: '事务所定义', icon: '🏢' },
  { id: 'five-points-set', title: '5点set', icon: '📋' },
  { id: 'employee-register', title: '从业者名簿', icon: '📖' },
  { id: 'account-book', title: '账簿', icon: '📒' },
  { id: 'exclusive-takken', title: '专任宅建士', icon: '👨‍💼' },
  { id: 'reward-disclosure', title: '报酬额揭示', icon: '💰' },
  { id: 'identification-sign', title: '标识', icon: '🏷️' },
  { id: 'information-office', title: '案内所', icon: '📍' },
  { id: 'legal-reform', title: '法改正', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '事務所（じむしょ）',
    chinese: '事务所',
    explanation: '宅建业者进行业务的场所，包括本店、支店或持续业务设施',
    example: '本店即使不从事宅建业，也视为事务所'
  },
  {
    japanese: '従業者名簿（じゅうぎょうしゃめいぼ）',
    chinese: '从业者名簿',
    explanation: '记录从业者信息的簿册，2025年法改正后住所、生年月日、性别不再需要记载',
    example: '名簿需在交易关系者请求时提供阅览，保存10年'
  },
  {
    japanese: '帳簿（ちょうぼ）',
    chinese: '账簿',
    explanation: '记录交易信息的簿册，包括交易日期、对象等，保存5年（自建新房10年）',
    example: '账簿不提供阅览义务，涉及商业秘密'
  },
  {
    japanese: '成年者である専任の宅地建物取引士（せいねんしゃであるせんにんのたくちたてものとりひきし）',
    chinese: '成年专任宅建士',
    explanation: '每5名工作人员中必须配备1名专职宅建士，负责契约缔结等业务',
    example: '宅建士离职后需在2周内补足，否则停业'
  },
  {
    japanese: '標識（ひょうしき）',
    chinese: '标识',
    explanation: '事务所内必须揭示的法定标牌，2025年法改正后不再记载专任宅建士氏名，改为记载人数',
    example: '在分让楼盘所在地或案内所内必须设置标识'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '本店は宅建業を営んでいなくても、宅建業の事務所として扱われる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '根据法规，本店无论是否从事宅建业，均视为事务所[citation:1]。'
  },
  {
    question: '従業者名簿には、従業者の住所を記載しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '2025年法改正后，从业者名簿不再需要记载从业者的住所、生年月日、性别，以保护个人隐私[citation:1][citation:9]。'
  },
  {
    question: '帳簿は取引関係者から閲覧請求があれば、提供しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '账簿涉及商业秘密，无提供阅览的义务[citation:1]。'
  },
  {
    question: '案内所には報酬額を掲示する必要がある。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '案内所无需揭示报酬额，仅事务所需要[citation:1]。'
  },
  {
    question: '宅建業者の事務所では、業務に従事する者10人に1人以上の宅建士を設置する必要がある。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '比例为每5名工作人员中至少1名宅建士，不是10人1人[citation:1]。'
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
  learningStore.recordTopicStudyTime('office_requirements', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('office_requirements')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('office_requirements')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('office_requirements', 0)
  
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
.office-requirements {
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

/* ========= 5点set图示 ========= */
.five-points-diagram {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.point-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: var(--primary-light);
  border-radius: var(--radius);
  text-align: center;
  transition: transform 0.3s ease;
}

.point-item:hover {
  transform: translateY(-5px);
}

.point-number {
  background: var(--primary);
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
}

.point-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.point-content p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 标识示例样式 ========= */
.sign-example {
  border: 2px solid var(--primary);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;
  max-width: 500px;
}

.sign-header {
  background: var(--primary);
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.125rem;
}

.sign-content {
  padding: 1rem;
  background: white;
}

.sign-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.sign-row:last-child {
  border-bottom: none;
}

.sign-row.highlight-row {
  background: #fff9e6;
  margin: 0 -1rem;
  padding: 0.5rem 1rem;
}

.sign-label {
  font-weight: 500;
  color: var(--text);
}

.sign-value {
  color: var(--muted);
}

/* ========= 法改正时间线 ========= */
.reform-timeline {
  margin: 2rem 0;
}

.reform-item {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
}

.reform-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 6rem;
  top: 3rem;
  bottom: -2rem;
  width: 2px;
  background: var(--primary-light);
}

.reform-date {
  min-width: 8rem;
  padding: 0.75rem 1rem;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  text-align: center;
  font-weight: 600;
  margin-right: 1.5rem;
  height: fit-content;
}

.reform-content {
  flex: 1;
  padding: 1rem;
  background: var(--bg);
  border-radius: var(--radius);
}

.reform-content h4 {
  margin: 0 0 1rem 0;
  color: var(--primary-dark);
  font-size: 1.125rem;
}

.reform-content ul {
  margin: 0;
  padding-left: 1.25rem;
}

.reform-content li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
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
  
  .five-points-diagram {
    grid-template-columns: 1fr;
  }
  
  .reform-item {
    flex-direction: column;
  }
  
  .reform-item:not(:last-child)::after {
    display: none;
  }
  
  .reform-date {
    margin-right: 0;
    margin-bottom: 1rem;
    min-width: auto;
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
  
  .quiz-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>