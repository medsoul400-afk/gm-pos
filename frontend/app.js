const CURRENCY = 'أوقية';
const STORAGE = 'mauritania_pos_data_v2';
const ORDERS = 'mauritania_pos_orders_v2';
const INVLOG = 'mauritania_pos_invlog_v1';
const e = (value = '') => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const money = n => Number(n || 0).toLocaleString('ar-MR', { maximumFractionDigits: 0 });
const id = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const clone = value => JSON.parse(JSON.stringify(value));

const i18n = {
  ar: {
    currency: 'أوقية',
    brand: 'نقطة بيع موريتانيا',
    subTitle: 'نظام بسيط ومتقدم لإدارة المبيعات والمخزون — الأوزان المتعددة والأسعار بالأوقية الموريتانية',
    restaurantMode: 'نقطة بيع مطعم 🍽️',
    groceryMode: 'نقطة بيع بقالة 🛒',
    pharmacyMode: 'نقطة بيع صيدلية 💊',
    storeMode: 'نقطة المحل 🏪',
    restaurantDesc: 'طلبات سريعة، قائمة طعام، وإحصاءات المبيعات اليومية',
    groceryDesc: 'باركود، إدارة مخزون بالأوزان، وتنبيهات الكمية المنخفضة',
    pharmacyDesc: 'إدارة أدوية، مستلزمات طبية، وتنبيهات المخزون والصلاحية',
    storeDesc: 'باركود، إدارة المخزون بالأوزان، وتنبيهات المخزون المنخفض',
    pos: 'نقطة البيع',
    inventory: 'المخزون والمنتجات',
    reports: 'التقارير والتحكم',
    settings: 'إعدادات المتجر',
    home: 'الرئيسية',
    searchPlaceholder: '🔍 ابحث باسم المنتج أو الباركود',
    scanPlaceholder: '⌁ امسح الباركود ثم Enter',
    all: 'الكل',
    emptyCart: 'السلة فارغة',
    clickProduct: 'اضغط على أي منتج لإضافته',
    total: 'المجموع الكلي',
    checkoutBtn: '✓ إتمام الطلب',
    clearCart: 'مسح',
    currentOrder: '🧾 الطلب الحالي',
    addProduct: '＋ إضافة منتج',
    productCol: 'المنتج',
    categoryCol: 'الفئة',
    priceCol: 'السعر',
    stockCol: 'المخزون',
    editStockCol: 'تعديل المخزون',
    actionsCol: 'الإجراءات',
    editBtn: '✏️ تعديل',
    deleteBtn: '🗑️',
    reportsTitle: '📊 التقارير والإحصائيات',
    reportsDesc: 'متابعة الأداء والمبيعات وحركة المخزون',
    todayOrders: 'طلبات اليوم',
    todayRevenue: 'إيرادات اليوم',
    totalOrders: 'إجمالي الطلبات',
    totalRevenue: 'إجمالي الإيرادات',
    lastOrders: '🧾 آخر طلبات المبيعات',
    stockLog: '📦 سجل حركة المخزون',
    clearOrders: '🗑️ مسح سجل الطلبات',
    clearLog: '🗑️ مسح سجل المخزون',
    loginTitle: 'نظام نقطة بيع موريتانيا',
    loginSub: 'سجل الدخول للمتابعة إلى لوحة التحكم',
    usernameField: 'اسم المستخدم',
    passwordField: 'كلمة المرور',
    loginBtn: 'تسجيل الدخول',
    quickLogin: 'دخول سريع للتجربة والتقييم:',
    managerRole: 'مدير (كامل الصلاحيات) 👑',
    cashierRole: 'كاشير (البيع فقط) 🛒',
    storekeeperRole: 'مسؤول مخزن (المخزون فقط) 📦',
    subExpiredTitle: 'تجديد الاشتراك الشهري',
    subExpiredDesc: 'انتهى الاشتراك الشهري. يرجى تجديده بقيمة 300 أوقية للرقم 41010021.',
    txnLabel: 'رقم العملية المرجعي (Transaction Reference)',
    subConfirmBtn: '✅ تأكيد العملية وتفعيل الاشتراك',
    subActive: 'الاشتراك نشط',
    expiresIn: 'ينتهي في',
    daysLeft: 'يوم',
    logoutBtn: '🚪 خروج',
    receiptTitle: '🧾 فاتورة مبيعات',
    storeSettingsTitle: '⚙️ إعدادات المتجر والفاتورة',
    storeName: 'اسم المحل / الصيدلية',
    storePhone: 'رقم الهاتف',
    storeAddress: 'العنوان',
    storeFooter: 'ملاحظة أسفل الفاتورة',
    saveSettings: '💾 حفظ الإعدادات',
    whatsappLabel: 'رقم واتساب العميل (مع رمز الدولة، مثال: 22241010021)',
    sendWhatsappBtn: '💬 إرسال الفاتورة عبر واتساب',
    printBtn: '🖨️ طباعة الفاتورة',
    closeBtn: 'إغلاق',
    receiptSaved: 'تم إتمام الطلب وعرض الفاتورة',
    phoneError: 'الرجاء إدخال رقم هاتف صحيح مع رمز الدولة',
    checkoutSuccess: '✅ تم إتمام الطلب بنجاح',
    catFruits: 'خضار وفواكه',
    catMeals: 'مأكولات',
    catSweets: 'حلويات',
    catDrinks: 'مشروبات',
    catCleaning: 'منظفات',
    catPharmacy: 'أدوية ومستلزمات',
    catBooks: 'كتب وقرطاسية',
    catElectronics: 'إلكترونيات',
    catClothing: 'ملابس وأحذية',
    catGeneral: 'عام',
    
    // Additional UI elements
    usernamePlaceholder: 'أدخل اسم المستخدم (مثال: admin)',
    passwordPlaceholder: 'أدخل كلمة المرور (مثال: 123)',

    // Spec 002 — New subscription request
    newSubscriptionLink: 'جديد هنا؟ اطلب اشتراكًا الآن',
    newSubscriptionTitle: 'طلب اشتراك جديد',
    newSubscriptionDesc: 'أدخل بياناتك لتقديم طلب الاشتراك. سنتحقق من التحويل البنكي ونفعّل حسابك خلال 24 ساعة.',
    bankNameLabel: 'الاسم البنكي (كما يظهر على حسابك البنكي)',
    bankNamePlaceholder: 'الاسم الكامل كما هو في التحويل البنكي',
    shopNameLabel: 'اسم المحل',
    shopNamePlaceholder: 'مثال: بقالة النور',
    phoneLabel: 'رقم الهاتف',
    phonePlaceholder: 'مثال: 22241010021',
    requestedUsernameLabel: 'اسم المستخدم المطلوب',
    requestedUsernamePlaceholder: 'سيستخدمه المدير للدخول',
    requestedPasswordLabel: 'كلمة المرور',
    requestedPasswordPlaceholder: 'كلمة مرور آمنة لحسابك',
    submitRequestBtn: '📨 إرسال الطلب',
    backToLoginLink: 'العودة لتسجيل الدخول',
    requestPendingTitle: '✅ تم استلام طلبك!',
    requestPendingMsg: 'شكرًا! تم تسجيل طلبك بحالة «قيد المراجعة». يرجى إرسال صورة إثبات التحويل البنكي عبر واتساب للرقم:',
    requestPendingNote: 'سيتواصل معك فريقنا بعد التحقق من الدفعة لتفعيل حسابك.',
    requestErrorDuplicate: 'اسم المستخدم هذا مستخدم بالفعل في طلب قيد المراجعة، يرجى اختيار اسم آخر.',

    // Spec 002 — Staff management
    staffManagement: '👥 إدارة الطاقم',
    staffManagementDesc: 'إنشاء وإدارة حسابات موظفي محلك (كاشيرية ومسؤولو مخزن)',
    addStaffBtn: '＋ إضافة موظف',
    staffNameCol: 'اسم الموظف',
    staffUsernameCol: 'اسم المستخدم',
    staffRoleCol: 'الدور',
    staffStatusCol: 'الحالة',
    staffActionsCol: 'الإجراءات',
    staffActive: '🟢 نشط',
    staffDisabled: '🔴 معطّل',
    disableStaffBtn: 'تعطيل',
    enableStaffBtn: 'تفعيل',
    addStaffTitle: '➕ إضافة موظف جديد',
    editStaffTitle: '✏️ تعديل بيانات الموظف',
    staffNameLabel: 'اسم الموظف *',
    staffNamePlaceholder: 'الاسم الكامل للموظف',
    staffUsernameLabel: 'اسم المستخدم *',
    staffUsernamePlaceholder: 'يستخدمه للدخول إلى النظام',
    staffPasswordLabel: 'كلمة المرور *',
    staffPasswordPlaceholder: 'كلمة مرور آمنة',
    staffPasswordEditNote: '(اتركه فارغًا إذا لا تريد تغيير كلمة المرور)',
    staffRoleLabel: 'الدور *',
    cashierRoleOpt: 'كاشير — صلاحية البيع فقط',
    storekeeperRoleOpt: 'مسؤول مخزن — صلاحية المخزون فقط',
    saveStaffBtn: '💾 حفظ',
    staffCreatedToast: '✅ تم إنشاء حساب الموظف بنجاح',
    staffUpdatedToast: '✅ تم تحديث بيانات الموظف',
    staffDisabledToast: '⛔ تم تعطيل حساب الموظف',
    staffEnabledToast: '✅ تم تفعيل حساب الموظف',
    confirmDisableStaff: 'هل تريد تعطيل حساب هذا الموظف؟ سيُرفض دخوله فورًا.',
    confirmEnableStaff: 'هل تريد إعادة تفعيل حساب هذا الموظف؟',
    noStaffYet: 'لا يوجد موظفون بعد. أضف موظفًا جديدًا للبدء.',
    staffLoadError: 'تعذّر تحميل قائمة الموظفين. تحقق من اتصال الخادم.',
    staffSaveError: 'تعذّر حفظ بيانات الموظف. تحقق من المدخلات.',
    changePasswordLabel: 'تغيير كلمة المرور',
    newPasswordLabel: 'كلمة المرور الجديدة',
    newPasswordPlaceholder: 'اتركه فارغًا إذا لا تريد التغيير',

    paymentMethod: 'طريقة الدفع والتفعيل:',
    sendSubAmount: 'يرجى إرسال مبلغ',
    receiverPhone: 'رقم الهاتف المستلم:',
    bankilyApp: 'تطبيق بنكيلي (Bankily)',
    sadadApp: 'تطبيق سداد (Sadad)',
    transferTo: 'حول إلى الرقم 41010021',
    step1: 'افتح تطبيقك البنكي المفضل (بنكيلي أو سداد).',
    step2: 'قم بإرسال مبلغ 300 أوقية للرقم المذكور أعلاه.',
    step3: 'انسخ رقم العملية وأدخله في الحقل أدناه لتأكيد التنشيط الفوري.',
    serviceSuspended: 'الخدمة متوقفة مؤقتاً',
    serviceSuspendedDesc: 'انتهى الاشتراك الشهري للنظام. يرجى التواصل مع المدير لتجديد الاشتراك.',
    subExpired: 'الاشتراك منتهي',
    subExpiredMsg: 'يمكن للمدير فقط تجديد الاشتراك عبر تسجيل الدخول بحسابه.',
    supportDetails: 'معلومات الدعم:',
    renewalPhone: 'رقم التجديد:',
    monthlyFee: 'القيمة الشهرية:',
    loggedInAs: 'مسجل الدخول:',
    subDetails: 'تفاصيل الاشتراك الشهري',
    renewExtend: 'تجديد أو تمديد الاشتراك:',
    renewExtendDesc: 'يمكنك تجديد اشتراكك بإرسال 300 أوقية للرقم 41010021 وإدخال رقم العملية الجديد:',
    newTxnPlaceholder: 'رقم العملية المرجعي الجديد',
    updateSubBtn: 'تحديث الاشتراك',
    storeSettingsDesc: 'قم بتخصيص معلومات متجرك وشكل الفواتير الصادرة',
    logoLabel: 'شعار المحل على الفاتورة',
    logoFormat: 'PNG أو JPG أو WEBP، حتى 1 ميغابايت',
    removeLogoBtn: 'إزالة الشعار',
    whatsappCheckLabel: 'إظهار خيار إرسال الفاتورة عبر واتساب (اختياري)',
    displayOptionsTitle: 'خيارات عرض الفاتورة',
    showLogoLabel: 'إظهار شعار المحل',
    showPhoneLabel: 'إظهار رقم الهاتف',
    showAddressLabel: 'إظهار العنوان',
    showFooterLabel: 'إظهار التذييل (ملاحظة أسفل الفاتورة)',
    receiptPreviewTitle: 'معاينة مباشرة للفاتورة',
    sampleProductLabel: 'منتج تجريبي',
    managerRoleLabel: 'مدير',
    cashierRoleLabel: 'كاشير',
    storekeeperRoleLabel: 'مسؤول مخزن',
    subActiveLabel: 'الاشتراك نشط',
    noProductsLabel: 'لا توجد منتجات مطابقة',
    registeredProductsLabel: 'منتج مسجل',
    salesStatsLabel: 'إحصائيات المبيعات',
    stockStatsLabel: 'إحصائيات حركة المخزون',
    unitsAddedTodayLabel: 'وحدة مضافة اليوم',
    totalUnitsAddedLabel: 'إجمالي الوحدات المضافة',
    productsAddedLabel: 'منتجات مضافة',
    totalMovementsLabel: 'إجمالي حركات المخزون',
    noOrdersLabel: 'لا توجد طلبات بعد',
    noStockMovementsLabel: 'لا توجد حركات مخزون مسجلة بعد',
    modeRestaurantLabel: '🍽️ مطعم',
    modeGroceryLabel: '🛒 بقالة',
    modePharmacyLabel: '💊 صيدلية',
    unitLabel: 'وحدة',
    unitsLabel: 'وحدات',
    editProductTitle: '✏️ تعديل المنتج',
    addProductTitle: '➕ إضافة منتج جديد',
    iconLabel: 'الأيقونة',
    productNameLabel: 'اسم المنتج *',
    categoryLabel: 'الفئة *',
    sellByWeightLabel: 'بيع بالوزن (يحتوي على أوزان وأسعار متعددة)',
    priceLabel: 'السعر',
    stockLabel: 'الكمية في المخزون *',
    barcodeLabel: 'باركود',
    manageWeightsLabel: 'إدارة الأوزان والأسعار',
    weightColLabel: 'الوزن *',
    addWeightBtnLabel: '＋ إضافة خيار وزن جديد',
    saveChangesBtnLabel: '💾 حفظ التعديلات',
    addProductBtnLabel: '✓ إضافة المنتج',
    cancelBtnLabel: 'إلغاء',
    
    // Toasts
    addWeightToast: 'يرجى إضافة خيار وزن واحد على الأقل للمنتج',
    productAddedToast: 'تمت إضافة المنتج',
    changesSavedToast: 'تم حفظ التعديلات',
    lowStockToast: 'المخزون غير كافٍ',
    barcodeNotFound: 'الباركود غير موجود',
    confirmDeleteProduct: 'هل تريد حذف هذا المنتج؟',
    productDeletedToast: 'تم حذف المنتج',
    stockUpdatedToast: 'تم تعديل المخزون',
    confirmClearOrders: 'هل تريد حذف جميع الطلبات؟',
    ordersClearedToast: 'تم مسح سجل الطلبات',
    confirmClearInvLog: 'هل تريد حذف جميع سجلات حركة المخزون؟',
    invLogClearedToast: 'تم مسح سجل المخزون',
    welcomeBackToast: 'مرحباً بك',
    logoutSuccessToast: 'تم تسجيل الخروج بنجاح',
    loginErrorToast: 'خطأ في اسم المستخدم أو كلمة المرور',
    noPermissionEdit: 'عذراً، لا تملك الصلاحية لتعديل المنتجات والمخزون',
    noPermissionSale: 'عذراً، لا تملك الصلاحية لإجراء المبيعات والطلبات',
    noPermissionClear: 'عذراً، صلاحية مسح سجل الطلبات للمدير فقط',
    receiptSavedToast: 'تم إتمام الطلب وعرض الفاتورة',
    saveSettingsSuccess: '✅ تم حفظ إعدادات المتجر بنجاح',
    logoSavedToast: 'تم حفظ الشعار',
    logoRemovedToast: 'تمت إزالة الشعار',
    subExtendedToast: '✅ تم تمديد الاشتراك لـ 30 يوماً إضافية!',
    enterValidTxnToast: 'الرجاء إدخال رقم عملية صحيح للتفعيل',
    phoneError: 'الرجاء إدخال رقم هاتف صحيح مع رمز الدولة',
    
    // Categories and Products
    'وجبات رئيسية': 'وجبات رئيسية',
    'مشاوي': 'مشاوي',
    'مقبلات': 'مقبلات',
    'مشروبات': 'مشروبات',
    'حلويات': 'حلويات',
    'مواد غذائية': 'مواد غذائية',
    'منظفات': 'منظفات',
    'ألبان': 'ألبان',
    'خضار وفواكه': 'خضار وفواكه',
    'أدوية وصفة': 'أدوية وصفة',
    'أدوية عامة': 'أدوية عامة',
    'فيتامينات': 'فيتامينات',
    'مستلزمات طبية': 'مستلزمات طبية',
    'عناية شخصية': 'عناية شخصية',
    
    'برجر لحم': 'برجر لحم',
    'بيتزا مارغريتا': 'بيتزا مارغريتا',
    'شاورما دجاج': 'شاورما دجاج',
    'كباب مشوي': 'كباب مشوي',
    'دجاج مشوي': 'دجاج مشوي',
    'سمك مشوي': 'سمك مشوي',
    'تبولة': 'تبولة',
    'حمص': 'حمص',
    'كولا': 'كولا',
    'عصير برتقال': 'عصير برتقال',
    'كنافة': 'كنافة',
    'أم علي': 'أم علي',
    'أرز بسمتي': 'أرز بسمتي',
    'زيت زيتون': 'زيت زيتون',
    'سكر ناعم': 'سكر ناعم',
    'حليب طازج': 'حليب طازج',
    'جبنة بيضاء': 'جبنة بيضاء',
    'زبادي طبيعي': 'زبادي طبيعي',
    'كولا 2ل': 'كولا 2ل',
    'عصير برتقال 1ل': 'عصير برتقال 1ل',
    'ماء معدني 1.5ل': 'ماء معدني 1.5ل',
    'صابون جلي': 'صابون جلي',
    'طماطم طازجة': 'طماطم طازجة',
    'موز بلدي': 'موز بلدي',
    'بنادول اكسترا': 'بنادول اكسترا',
    'فيتامين سي فوار': 'فيتامين سي فوار',
    'شراب السعال ديلسيم': 'شراب السعال ديلسيم',
    'ضمادات جروح طبية': 'ضمادات جروح طبية',
    'كمامات طبية 50 حبة': 'كمامات طبية 50 حبة',
    'معقم جيل لليدين': 'معقم جيل لليدين',
    'جهاز قياس ضغط الدم': 'جهاز قياس ضغط الدم',
    'قطرة مرطبة للعين': 'قطرة مرطبة للعين',
    'حليب أطفال رقم 1': 'حليب أطفال رقم 1',
    'كريم مرطب للبشرة': 'كريم مرطب للبشرة',
    'صابون طبي مضاد للبكتيريا': 'صابون طبي مضاد للبكتيريا',
    
    '1كغ': '1 كغ',
    '2كغ': '2 كغ',
    '5كغ': '5 كغ',
    '250مل': '250 مل',
    '500مل': '500 مل',
    '1ل': '1 ل',
    '250غ': '250 غ',
    '500غ': '500 غ',
    
    // Pharmacy expansions
    'قطرة أوتريفين للأطفال': 'قطرة أوتريفين للأطفال',
    'مرهم جينوداكتارين': 'مرهم جينوداكتارين',
    'ميزان حرارة رقمي': 'ميزان حرارة رقمي',
    'شاش معقم': 'شاش معقم',
    'حقنة طبية 5مل': 'حقنة طبية 5مل'
  },
  en: {
    currency: 'UM',
    brand: 'Mauritania POS',
    subTitle: 'Simple and advanced sales & inventory management — weights support and prices in Ouguiya',
    restaurantMode: 'Restaurant POS 🍽️',
    groceryMode: 'Grocery POS 🛒',
    pharmacyMode: 'Pharmacy POS 💊',
    storeMode: 'Store POS 🏪',
    restaurantDesc: 'Quick orders, menu list, and daily sales statistics',
    groceryDesc: 'Barcodes, weight-based inventory, and low stock alerts',
    pharmacyDesc: 'Medicines management, medical supplies, and stock/expiry alerts',
    storeDesc: 'Barcodes, inventory management, and low stock alerts',
    pos: 'Point of Sale',
    inventory: 'Inventory & Products',
    reports: 'Reports & Control',
    settings: 'Store Settings',
    home: 'Home',
    searchPlaceholder: '🔍 Search by name or barcode',
    scanPlaceholder: '⌁ Scan barcode and press Enter',
    all: 'All',
    emptyCart: 'Cart is empty',
    clickProduct: 'Click a product to add it',
    total: 'Grand Total',
    checkoutBtn: '✓ Checkout',
    clearCart: 'Clear',
    currentOrder: '🧾 Current Order',
    addProduct: '＋ Add Product',
    productCol: 'Product',
    categoryCol: 'Category',
    priceCol: 'Price',
    stockCol: 'Stock',
    editStockCol: 'Edit Stock',
    actionsCol: 'Actions',
    editBtn: '✏️ Edit',
    deleteBtn: '🗑️',
    reportsTitle: '📊 Reports & Statistics',
    reportsDesc: 'Track performance, sales, and stock movements',
    todayOrders: 'Today\'s Orders',
    todayRevenue: 'Today\'s Revenue',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    lastOrders: '🧾 Last Sales Orders',
    stockLog: '📦 Stock Movement Log',
    clearOrders: '🗑️ Clear Sales History',
    clearLog: '🗑️ Clear Stock Log',
    loginTitle: 'Mauritania POS System',
    loginSub: 'Log in to continue to dashboard',
    usernameField: 'Username',
    passwordField: 'Password',
    loginBtn: 'Log In',
    quickLogin: 'Quick Demo Login:',
    managerRole: 'Manager (Full Access) 👑',
    cashierRole: 'Cashier (Sales Only) 🛒',
    storekeeperRole: 'Warehouse Manager (Stock Only) 📦',
    subExpiredTitle: 'Renew Monthly Subscription',
    subExpiredDesc: 'Monthly subscription expired. Please renew for 300 UM to number 41010021.',
    txnLabel: 'Transaction Reference ID',
    subConfirmBtn: '✅ Confirm & Activate',
    subActive: 'Subscription active',
    expiresIn: 'Expires on',
    daysLeft: 'days',
    logoutBtn: '🚪 Logout',
    receiptTitle: '🧾 Sales Receipt',
    storeSettingsTitle: '⚙️ Store & Invoice Settings',
    storeName: 'Store / Pharmacy Name',
    storePhone: 'Store Phone Number',
    storeAddress: 'Store Address',
    storeFooter: 'Receipt Footer (Thank you note)',
    saveSettings: '💾 Save Settings',
    whatsappLabel: 'Customer WhatsApp (with country code, e.g., 22241010021)',
    sendWhatsappBtn: '💬 Send via WhatsApp',
    printBtn: '🖨️ Print Receipt',
    closeBtn: 'Close',
    receiptSaved: 'Order completed, displaying receipt',
    phoneError: 'Please enter a valid phone number with country code',
    checkoutSuccess: '✅ Order completed successfully',
    catFruits: 'Fruits & Veggies',
    catMeals: 'Meals & Food',
    catSweets: 'Sweets & Desserts',
    catDrinks: 'Drinks & Beverages',
    catCleaning: 'Cleaning & Detergents',
    catPharmacy: 'Pharmacy & Medical',
    catBooks: 'Books & Stationery',
    catElectronics: 'Electronics',
    catClothing: 'Clothing & Apparel',
    catGeneral: 'General',
    
    // Additional UI elements
    usernamePlaceholder: 'Enter username (e.g., admin)',
    passwordPlaceholder: 'Enter password (e.g., 123)',

    // Spec 002 — New subscription request
    newSubscriptionLink: 'New here? Request a subscription',
    newSubscriptionTitle: 'New Subscription Request',
    newSubscriptionDesc: 'Fill in your details to submit a subscription request. We will verify the bank transfer and activate your account within 24 hours.',
    bankNameLabel: 'Bank Account Name (as it appears on your bank account)',
    bankNamePlaceholder: 'Full name as shown on the bank transfer',
    shopNameLabel: 'Shop Name',
    shopNamePlaceholder: 'e.g., Al-Nour Grocery',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'e.g., 22241010021',
    requestedUsernameLabel: 'Requested Username',
    requestedUsernamePlaceholder: 'Will be used by the manager to log in',
    requestedPasswordLabel: 'Password',
    requestedPasswordPlaceholder: 'A secure password for your account',
    submitRequestBtn: '📨 Submit Request',
    backToLoginLink: 'Back to Login',
    requestPendingTitle: '✅ Request Received!',
    requestPendingMsg: 'Thank you! Your request has been registered with status «Pending Review». Please send proof of bank transfer via WhatsApp to:',
    requestPendingNote: 'Our team will contact you after verifying the payment to activate your account.',
    requestErrorDuplicate: 'This username is already used in a pending request, please choose another.',

    // Spec 002 — Staff management
    staffManagement: '👥 Staff Management',
    staffManagementDesc: 'Create and manage employee accounts for your store (cashiers and storekeepers)',
    addStaffBtn: '＋ Add Employee',
    staffNameCol: 'Employee Name',
    staffUsernameCol: 'Username',
    staffRoleCol: 'Role',
    staffStatusCol: 'Status',
    staffActionsCol: 'Actions',
    staffActive: '🟢 Active',
    staffDisabled: '🔴 Disabled',
    disableStaffBtn: 'Disable',
    enableStaffBtn: 'Enable',
    addStaffTitle: '➕ Add New Employee',
    editStaffTitle: '✏️ Edit Employee',
    staffNameLabel: 'Employee Name *',
    staffNamePlaceholder: 'Full name of the employee',
    staffUsernameLabel: 'Username *',
    staffUsernamePlaceholder: 'Used to log in to the system',
    staffPasswordLabel: 'Password *',
    staffPasswordPlaceholder: 'A secure password',
    staffPasswordEditNote: '(Leave blank to keep the current password)',
    staffRoleLabel: 'Role *',
    cashierRoleOpt: 'Cashier — Sales only',
    storekeeperRoleOpt: 'Storekeeper — Stock only',
    saveStaffBtn: '💾 Save',
    staffCreatedToast: '✅ Employee account created successfully',
    staffUpdatedToast: '✅ Employee details updated',
    staffDisabledToast: '⛔ Employee account disabled',
    staffEnabledToast: '✅ Employee account enabled',
    confirmDisableStaff: 'Are you sure you want to disable this employee account? They will be rejected immediately.',
    confirmEnableStaff: 'Are you sure you want to re-enable this employee account?',
    noStaffYet: 'No employees yet. Add a new employee to get started.',
    staffLoadError: 'Failed to load staff list. Check server connection.',
    staffSaveError: 'Failed to save employee data. Check inputs.',
    changePasswordLabel: 'Change Password',
    newPasswordLabel: 'New Password',
    newPasswordPlaceholder: 'Leave blank to keep unchanged',

    paymentMethod: 'Payment & Activation Method:',
    sendSubAmount: 'Please send',
    receiverPhone: 'Receiver Phone:',
    bankilyApp: 'Bankily App',
    sadadApp: 'Sadad App',
    transferTo: 'Transfer to 41010021',
    step1: 'Open your banking app (Bankily or Sadad).',
    step2: 'Transfer 300 UM to the phone number above.',
    step3: 'Copy the transaction ID and enter it below for instant activation.',
    serviceSuspended: 'Service Suspended',
    serviceSuspendedDesc: 'Monthly subscription expired. Please contact the manager to renew.',
    subExpired: 'Subscription Expired',
    subExpiredMsg: 'Only the Manager can renew the subscription by logging into their account.',
    supportDetails: 'Support Details:',
    renewalPhone: 'Renewal Phone:',
    monthlyFee: 'Monthly Fee:',
    loggedInAs: 'Logged in as:',
    subDetails: 'Subscription Details',
    renewExtend: 'Renew or Extend Subscription:',
    renewExtendDesc: 'You can renew by sending 300 UM to 41010021 and entering the transaction ID below:',
    newTxnPlaceholder: 'New Transaction Reference ID',
    updateSubBtn: 'Update Subscription',
    storeSettingsDesc: 'Customize your store details and invoice templates',
    logoLabel: 'Store logo on the receipt',
    logoFormat: 'PNG, JPG, or WEBP — 1 MB maximum',
    removeLogoBtn: 'Remove logo',
    whatsappCheckLabel: 'Show optional WhatsApp invoice sharing',
    displayOptionsTitle: 'Receipt Display Options',
    showLogoLabel: 'Show store logo',
    showPhoneLabel: 'Show phone number',
    showAddressLabel: 'Show address',
    showFooterLabel: 'Show footer note',
    receiptPreviewTitle: 'Live Receipt Preview',
    sampleProductLabel: 'Sample Product',
    managerRoleLabel: 'Manager',
    cashierRoleLabel: 'Cashier',
    storekeeperRoleLabel: 'Storekeeper',
    subActiveLabel: 'Subscription Active',
    noProductsLabel: 'No matching products',
    registeredProductsLabel: 'registered products',
    salesStatsLabel: 'Sales Statistics',
    stockStatsLabel: 'Stock Statistics',
    unitsAddedTodayLabel: 'units added today',
    totalUnitsAddedLabel: 'total units added',
    productsAddedLabel: 'products added',
    totalMovementsLabel: 'total movements',
    noOrdersLabel: 'No orders yet',
    noStockMovementsLabel: 'No stock movements recorded yet',
    modeRestaurantLabel: '🍽️ Restaurant',
    modeGroceryLabel: '🛒 Grocery',
    modePharmacyLabel: '💊 Pharmacy',
    unitLabel: 'unit',
    unitsLabel: 'units',
    editProductTitle: '✏️ Edit Product',
    addProductTitle: '➕ Add New Product',
    iconLabel: 'Product Icon',
    productNameLabel: 'Product Name *',
    categoryLabel: 'Category *',
    sellByWeightLabel: 'Sell by weight (has multiple weights and prices)',
    priceLabel: 'Price',
    stockLabel: 'Quantity in stock *',
    barcodeLabel: 'Barcode',
    manageWeightsLabel: 'Manage Weights & Prices',
    weightColLabel: 'Weight *',
    addWeightBtnLabel: '＋ Add new weight option',
    saveChangesBtnLabel: '💾 Save Changes',
    addProductBtnLabel: '✓ Add Product',
    cancelBtnLabel: 'Cancel',
    
    // Toasts
    addWeightToast: 'Please add at least one weight option',
    productAddedToast: 'Product added successfully',
    changesSavedToast: 'Changes saved successfully',
    lowStockToast: 'Insufficient stock',
    barcodeNotFound: 'Barcode not found',
    confirmDeleteProduct: 'Are you sure you want to delete this product?',
    productDeletedToast: 'Product deleted',
    stockUpdatedToast: 'Stock updated',
    confirmClearOrders: 'Are you sure you want to clear all orders?',
    ordersClearedToast: 'Sales history cleared',
    confirmClearInvLog: 'Are you sure you want to clear all stock logs?',
    invLogClearedToast: 'Stock log cleared',
    welcomeBackToast: 'Welcome back',
    logoutSuccessToast: 'Logged out successfully',
    loginErrorToast: 'Invalid username or password',
    noPermissionEdit: 'Sorry, you do not have permission to edit products',
    noPermissionSale: 'Sorry, you do not have permission to make sales',
    noPermissionClear: 'Sorry, only managers can clear sales history',
    receiptSavedToast: 'Order completed, displaying receipt',
    saveSettingsSuccess: '✅ Store settings saved successfully',
    logoSavedToast: 'Logo saved',
    logoRemovedToast: 'Logo removed',
    subExtendedToast: '✅ Subscription extended for 30 additional days!',
    enterValidTxnToast: 'Please enter a valid transaction ID',
    
    // Categories and Products
    'وجبات رئيسية': 'Main Dishes',
    'مشاوي': 'Grills',
    'مقبلات': 'Appetizers',
    'مشروبات': 'Drinks',
    'حلويات': 'Sweets',
    'مواد غذائية': 'Groceries',
    'منظفات': 'Cleaning',
    'ألبان': 'Dairy',
    'خضار وفواكه': 'Fruits & Veggies',
    'أدوية وصفة': 'Prescription Drugs',
    'أدوية عامة': 'General Medicine',
    'فيتامينات': 'Vitamins',
    'مستلزمات طبية': 'Medical Supplies',
    'عناية شخصية': 'Personal Care',
    
    'برجر لحم': 'Beef Burger',
    'بيتزا مارغريتا': 'Pizza Margherita',
    'شاورما دجاج': 'Chicken Shawarma',
    'كباب مشوي': 'Grilled Kebab',
    'دجاج مشوي': 'Grilled Chicken',
    'سمك مشوي': 'Grilled Fish',
    'تبولة': 'Tabbouleh',
    'حمص': 'Hummus',
    'كولا': 'Cola',
    'عصير برتقال': 'Orange Juice',
    'كنافة': 'Kunafa',
    'أم علي': 'Um Ali',
    'أرز بسمتي': 'Basmati Rice',
    'زيت زيتون': 'Olive Oil',
    'سكر ناعم': 'Powdered Sugar',
    'حليب طازج': 'Fresh Milk',
    'جبنة بيضاء': 'White Cheese',
    'زبادي طبيعي': 'Natural Yogurt',
    'كولا 2ل': 'Cola 2L',
    'عصير برتقال 1ل': 'Orange Juice 1L',
    'ماء معدني 1.5ل': 'Mineral Water 1.5L',
    'صابون جلي': 'Dish Soap',
    'طماطم طازجة': 'Fresh Tomatoes',
    'موز بلدي': 'Local Bananas',
    'بنادول اكسترا': 'Panadol Extra',
    'فيتامين سي فوار': 'Effervescent Vitamin C',
    'شراب السعال ديلسيم': 'Delsym Cough Syrup',
    'ضمادات جروح طبية': 'Medical Bandages',
    'كمامات طبية 50 حبة': 'Medical Masks (50 pcs)',
    'معقم جيل لليدين': 'Hand Sanitizer Gel',
    'جهاز قياس ضغط الدم': 'Blood Pressure Monitor',
    'قطرة مرطبة للعين': 'Lubricating Eye Drops',
    'حليب أطفال رقم 1': 'Baby Formula No. 1',
    'كريم مرطب للبشرة': 'Skin Moisturizer',
    'صابون طبي مضاد للبكتيريا': 'Antibacterial Medical Soap',
    
    '1كغ': '1 kg',
    '2كغ': '2 kg',
    '5كغ': '5 kg',
    '250مل': '250 ml',
    '500مل': '500 ml',
    '1ل': '1 L',
    '250غ': '250 g',
    '500غ': '500 g',
    
    // Pharmacy expansions
    'قطرة أوتريفين للأطفال': 'Otrivin Kids Drops',
    'مرهم جينوداكتارين': 'Gynodaktarin Cream',
    'ميزان حرارة رقمي': 'Digital Thermometer',
    'شاش معقم': 'Sterile Gauze',
    'حقنة طبية 5مل': '5ml Medical Syringe'
  },
  fr: {
    currency: 'UM',
    brand: 'POS Mauritanie',
    subTitle: 'Gestion simple des ventes, des stocks et des factures',
    restaurantMode: 'Point de vente restaurant 🍽️',
    groceryMode: 'Point de vente épicerie 🛒',
    pharmacyMode: 'Point de vente pharmacie 💊',
    storeMode: 'Point de vente magasin 🏪',
    restaurantDesc: 'Commandes rapides, menu et statistiques quotidiennes',
    groceryDesc: 'Codes-barres, stocks et alertes de faible quantité',
    pharmacyDesc: 'Médicaments, fournitures médicales et suivi du stock',
    storeDesc: 'Codes-barres, gestion des stocks et alertes de stock faible',
    pos: 'Caisse',
    inventory: 'Stock et produits',
    reports: 'Rapports',
    settings: 'Paramètres',
    home: 'Accueil',
    searchPlaceholder: '🔍 Rechercher un produit ou un code-barres',
    scanPlaceholder: '⌁ Scanner le code-barres puis Entrée',
    all: 'Tous',
    emptyCart: 'Le panier est vide',
    clickProduct: 'Choisissez un produit pour l’ajouter',
    total: 'Total général',
    checkoutBtn: '✓ Valider la vente',
    clearCart: 'Vider',
    currentOrder: '🧾 Vente en cours',
    addProduct: '＋ Ajouter un produit',
    productCol: 'Produit',
    categoryCol: 'Catégorie',
    priceCol: 'Prix',
    stockCol: 'Stock',
    editStockCol: 'Modifier le stock',
    actionsCol: 'Actions',
    editBtn: '✏️ Modifier',
    deleteBtn: '🗑️',
    reportsTitle: '📊 Rapports et statistiques',
    reportsDesc: 'Suivez les ventes et les mouvements de stock',
    todayOrders: 'Ventes du jour',
    todayRevenue: 'Chiffre du jour',
    totalOrders: 'Total des ventes',
    totalRevenue: 'Chiffre total',
    lastOrders: '🧾 Dernières ventes',
    stockLog: '📦 Historique du stock',
    clearOrders: '🗑️ Effacer les ventes',
    clearLog: '🗑️ Effacer l’historique',
    loginTitle: 'Système POS Mauritanie',
    loginSub: 'Connectez-vous pour continuer',
    usernameField: 'Utilisateur',
    passwordField: 'Mot de passe',
    loginBtn: 'Connexion',
    quickLogin: 'Accès de démonstration :',
    managerRole: 'Gérant (accès complet) 👑',
    cashierRole: 'Caissier (ventes uniquement) 🛒',
    storekeeperRole: 'Magasinier (stock uniquement) 📦',
    subExpiredTitle: 'Renouveler l\'abonnement mensuel',
    subExpiredDesc: 'L\'abonnement mensuel a expiré. Veuillez le renouveler pour 300 UM au numéro 41010021.',
    txnLabel: 'ID de référence de transaction',
    subConfirmBtn: 'Confirmer et activer',
    subActive: 'Abonnement actif',
    expiresIn: 'Expire le',
    daysLeft: 'jours',
    logoutBtn: '🚪 Déconnexion',
    receiptTitle: '🧾 Facture de vente',
    storeSettingsTitle: '⚙️ Paramètres du magasin et de la facture',
    storeName: 'Nom du magasin / de la pharmacie',
    storePhone: 'Téléphone',
    storeAddress: 'Adresse',
    storeFooter: 'Note en bas de facture',
    saveSettings: '💾 Enregistrer',
    whatsappLabel: 'WhatsApp du client (avec indicatif pays, ex. 22241010021)',
    sendWhatsappBtn: '💬 Envoyer par WhatsApp',
    printBtn: '🖨️ Imprimer la facture',
    closeBtn: 'Fermer',
    receiptSaved: 'Vente terminée, facture affichée',
    phoneError: 'Saisissez un numéro WhatsApp valide avec indicatif pays',
    checkoutSuccess: '✅ Vente terminée avec succès',
    catFruits: 'Fruits & Légumes',
    catMeals: 'Repas & Nourriture',
    catSweets: 'Desserts & Sweets',
    catDrinks: 'Boissons',
    catCleaning: 'Nettoyage & Détergents',
    catPharmacy: 'Pharmacie & Médical',
    catBooks: 'Livres & Papeterie',
    catElectronics: 'Électronique',
    catClothing: 'Vêtements',
    catGeneral: 'Général',
    
    // Additional UI elements
    usernamePlaceholder: 'Entrez le nom d\'utilisateur (ex. admin)',
    passwordPlaceholder: 'Entrez le mot de passe (ex. 123)',

    // Spec 002 — Nouvelle demande d'abonnement
    newSubscriptionLink: 'Nouveau ici ? Demandez un abonnement',
    newSubscriptionTitle: 'Demande de nouvel abonnement',
    newSubscriptionDesc: 'Remplissez vos informations pour soumettre une demande d\'abonnement. Nous vérifierons le virement bancaire et activerons votre compte sous 24h.',
    bankNameLabel: 'Nom du compte bancaire (tel qu\'il apparaît sur votre compte)',
    bankNamePlaceholder: 'Nom complet tel qu\'il figure sur le virement',
    shopNameLabel: 'Nom du magasin',
    shopNamePlaceholder: 'ex. Épicerie Al-Nour',
    phoneLabel: 'Numéro de téléphone',
    phonePlaceholder: 'ex. 22241010021',
    requestedUsernameLabel: 'Nom d\'utilisateur demandé',
    requestedUsernamePlaceholder: 'Utilisé par le gérant pour se connecter',
    requestedPasswordLabel: 'Mot de passe',
    requestedPasswordPlaceholder: 'Un mot de passe sécurisé',
    submitRequestBtn: '📨 Envoyer la demande',
    backToLoginLink: 'Retour à la connexion',
    requestPendingTitle: '✅ Demande reçue !',
    requestPendingMsg: 'Merci ! Votre demande a été enregistrée avec le statut «En attente de vérification». Veuillez envoyer la preuve du virement par WhatsApp au :',
    requestPendingNote: 'Notre équipe vous contactera après vérification du paiement pour activer votre compte.',
    requestErrorDuplicate: 'Ce nom d\'utilisateur est déjà utilisé dans une demande en cours, veuillez en choisir un autre.',

    // Spec 002 — Gestion du personnel
    staffManagement: '👥 Gestion du personnel',
    staffManagementDesc: 'Créer et gérer les comptes des employés de votre magasin (caissiers et magasiniers)',
    addStaffBtn: '＋ Ajouter un employé',
    staffNameCol: 'Nom de l\'employé',
    staffUsernameCol: 'Nom d\'utilisateur',
    staffRoleCol: 'Rôle',
    staffStatusCol: 'Statut',
    staffActionsCol: 'Actions',
    staffActive: '🟢 Actif',
    staffDisabled: '🔴 Désactivé',
    disableStaffBtn: 'Désactiver',
    enableStaffBtn: 'Activer',
    addStaffTitle: '➕ Ajouter un nouvel employé',
    editStaffTitle: '✏️ Modifier l\'employé',
    staffNameLabel: 'Nom de l\'employé *',
    staffNamePlaceholder: 'Nom complet de l\'employé',
    staffUsernameLabel: 'Nom d\'utilisateur *',
    staffUsernamePlaceholder: 'Utilisé pour se connecter au système',
    staffPasswordLabel: 'Mot de passe *',
    staffPasswordPlaceholder: 'Un mot de passe sécurisé',
    staffPasswordEditNote: '(Laisser vide pour garder le mot de passe actuel)',
    staffRoleLabel: 'Rôle *',
    cashierRoleOpt: 'Caissier — Ventes uniquement',
    storekeeperRoleOpt: 'Magasinier — Stock uniquement',
    saveStaffBtn: '💾 Enregistrer',
    staffCreatedToast: '✅ Compte employé créé avec succès',
    staffUpdatedToast: '✅ Données de l\'employé mises à jour',
    staffDisabledToast: '⛔ Compte employé désactivé',
    staffEnabledToast: '✅ Compte employé activé',
    confirmDisableStaff: 'Voulez-vous désactiver ce compte employé ? Il sera rejeté immédiatement.',
    confirmEnableStaff: 'Voulez-vous réactiver ce compte employé ?',
    noStaffYet: 'Aucun employé pour le moment. Ajoutez un nouvel employé pour commencer.',
    staffLoadError: 'Impossible de charger la liste du personnel. Vérifiez la connexion au serveur.',
    staffSaveError: 'Impossible d\'enregistrer les données de l\'employé. Vérifiez les saisies.',
    changePasswordLabel: 'Changer le mot de passe',
    newPasswordLabel: 'Nouveau mot de passe',
    newPasswordPlaceholder: 'Laisser vide pour ne pas changer',

    paymentMethod: 'Méthode de paiement & activation :',
    sendSubAmount: 'Veuillez envoyer',
    receiverPhone: 'N° de téléphone destinataire :',
    bankilyApp: 'Application Bankily',
    sadadApp: 'Application Sadad',
    transferTo: 'Transférer au 41010021',
    step1: 'Ouvrez votre application bancaire (Bankily ou Sadad).',
    step2: 'Transférez 300 UM au numéro ci-dessus.',
    step3: 'Copiez l\'identifiant de transaction et saisissez-le ci-dessous pour activation.',
    serviceSuspended: 'Service Suspendu',
    serviceSuspendedDesc: 'L\'abonnement mensuel a expiré. Veuillez contacter le gérant pour renouveler.',
    subExpired: 'Abonnement expiré',
    subExpiredMsg: 'Seul le gérant peut renouveler l\'abonnement en se connectant.',
    supportDetails: 'Détails du support :',
    renewalPhone: 'Téléphone de renouvellement :',
    monthlyFee: 'Frais mensuels :',
    loggedInAs: 'Connecté en tant que :',
    subDetails: 'Détails de l\'abonnement',
    renewExtend: 'Renouveler ou prolonger l\'abonnement :',
    renewExtendDesc: 'Vous pouvez renouveler en envoyant 300 UM au 41010021 et en saisissant l\'ID ci-dessous :',
    newTxnPlaceholder: 'Nouvel ID de référence de transaction',
    updateSubBtn: 'Mettre à jour l\'abonnement',
    storeSettingsDesc: 'Personnalisez les détails de votre magasin et les modèles de facture',
    logoLabel: 'Logo du magasin sur la facture',
    logoFormat: 'PNG, JPG ou WEBP — 1 Mo maximum',
    removeLogoBtn: 'Supprimer le logo',
    whatsappCheckLabel: 'Afficher l’envoi facultatif de la facture par WhatsApp',
    displayOptionsTitle: 'Options d\'affichage de la facture',
    showLogoLabel: 'Afficher le logo',
    showPhoneLabel: 'Afficher le numéro de téléphone',
    showAddressLabel: 'Afficher l\'adresse',
    showFooterLabel: 'Afficher la note de pied de page',
    receiptPreviewTitle: 'Aperçu en direct de la facture',
    sampleProductLabel: 'Produit exemple',
    managerRoleLabel: 'Gérant',
    cashierRoleLabel: 'Caissier',
    storekeeperRoleLabel: 'Magasinier',
    subActiveLabel: 'Abonnement Actif',
    noProductsLabel: 'Aucun produit correspondant',
    registeredProductsLabel: 'produits enregistrés',
    salesStatsLabel: 'Statistiques des ventes',
    stockStatsLabel: 'Statistiques des stocks',
    unitsAddedTodayLabel: 'unités ajoutées aujourd\'hui',
    totalUnitsAddedLabel: 'total des unités ajoutées',
    productsAddedLabel: 'produits ajoutés',
    totalMovementsLabel: 'total des mouvements',
    noOrdersLabel: 'Aucune commande pour le moment',
    noStockMovementsLabel: 'Aucun mouvement de stock enregistré',
    modeRestaurantLabel: '🍽️ Restaurant',
    modeGroceryLabel: '🛒 Épicerie',
    modePharmacyLabel: '💊 Pharmacie',
    unitLabel: 'unité',
    unitsLabel: 'unités',
    editProductTitle: '✏️ Modifier le produit',
    addProductTitle: '➕ Ajouter un nouveau produit',
    iconLabel: 'Icône',
    productNameLabel: 'Nom du produit *',
    categoryLabel: 'Catégorie *',
    sellByWeightLabel: 'Vendre au poids (plusieurs poids et prix)',
    priceLabel: 'Prix',
    stockLabel: 'Quantité en stock *',
    barcodeLabel: 'Code-barres',
    manageWeightsLabel: 'Gérer les poids et prix',
    weightColLabel: 'Poids *',
    addWeightBtnLabel: '＋ Ajouter une option de poids',
    saveChangesBtnLabel: '💾 Enregistrer les modifications',
    addProductBtnLabel: '✓ Ajouter le produit',
    cancelBtnLabel: 'Annuler',
    
    // Toasts
    addWeightToast: 'Veuillez ajouter au moins une option de poids',
    productAddedToast: 'Produit ajouté avec succès',
    changesSavedToast: 'Modifications enregistrées avec succès',
    lowStockToast: 'Stock insuffisant',
    barcodeNotFound: 'Code-barres non trouvé',
    confirmDeleteProduct: 'Voulez-vous supprimer ce produit ?',
    productDeletedToast: 'Produit supprimé',
    stockUpdatedToast: 'Stock mis à jour',
    confirmClearOrders: 'Voulez-vous effacer toutes les ventes ?',
    ordersClearedToast: 'Historique des ventes effacé',
    confirmClearInvLog: 'Voulez-vous effacer tout l\'historique du stock ?',
    invLogClearedToast: 'Historique du stock effacé',
    welcomeBackToast: 'Bienvenue',
    logoutSuccessToast: 'Déconnexion réussie',
    loginErrorToast: 'Identifiant ou mot de passe incorrect',
    noPermissionEdit: 'Désolé, vous n\'avez pas la permission de modifier les produits',
    noPermissionSale: 'Désolé, vous n\'avez pas la permission de faire des ventes',
    noPermissionClear: 'Désolé, seul le gérant peut effacer l\'historique des ventes',
    receiptSavedToast: 'Vente terminée, facture affichée',
    saveSettingsSuccess: '✅ Paramètres enregistrés avec succès',
    logoSavedToast: 'Logo enregistré',
    logoRemovedToast: 'Logo supprimé',
    subExtendedToast: '✅ Abonnement prolongé de 30 jours supplémentaires !',
    enterValidTxnToast: 'Veuillez entrer un ID de transaction valide',
    
    // Categories and Products
    'وجبات رئيسية': 'Plats Principaux',
    'مشاوي': 'Grillades',
    'مقبلات': 'Entrées',
    'مشروبات': 'Boissons',
    'حلويات': 'Desserts',
    'مواد غذائية': 'Alimentation',
    'منظفات': 'Nettoyage',
    'ألبان': 'Produits laitiers',
    'خضار وفواكه': 'Fruits & Légumes',
    'أدوية وصفة': 'Sur ordonnance',
    'أدوية عامة': 'Médicaments généraux',
    'فيتامينات': 'Vitamines',
    'مستلزمات طبية': 'Matériel médical',
    'عناية شخصية': 'Soins personnels',
    
    'برجر لحم': 'Burger de bœuf',
    'بيتزا مارغريتا': 'Pizza Margherita',
    'شاورما دجاج': 'Shawarma au poulet',
    'كباب مشوي': 'Kebab grillé',
    'دجاج مشوي': 'Poulet grillé',
    'سمك مشوي': 'Poisson grillé',
    'تبولة': 'Taboulé',
    'حمص': 'Houmous',
    'كولا': 'Cola',
    'عصير برتقال': 'Jus d\'orange',
    'كنافة': 'Kounafa',
    'أم علي': 'Oum Ali',
    'أرز بسمتي': 'Riz basmati',
    'زيت زيتون': 'Huile d\'olive',
    'سكر ناعم': 'Sucre en poudre',
    'حليب طازج': 'Lait frais',
    'جبنة بيضاء': 'Fromage blanc',
    'زبادي طبيعي': 'Yaourt nature',
    'كولا 2ل': 'Cola 2L',
    'عصير برتقال 1ل': 'Jus d\'orange 1L',
    'ماء معدني 1.5ل': 'Eau minérale 1.5L',
    'صابون جلي': 'Liquide vaisselle',
    'طماطم طازجة': 'Tomates fraîches',
    'موز بلدي': 'Bananes locales',
    'بنادول اكسترا': 'Panadol Extra',
    'فيتامين سي فوار': 'Vitamine C effervescente',
    'شراب السعال ديلسيم': 'Sirop contre la toux Delsym',
    'ضمادات جروح طبية': 'Pansements médicaux',
    'كمامات طبية 50 حبة': 'Masques médicaux (50 pcs)',
    'معقم جيل لليدين': 'Gel désinfectant mains',
    'جهاز قياس ضغط الدم': 'Tensiomètre',
    'قطرة مرطبة للعين': 'Collyre hydratant',
    'حليب أطفال رقم 1': 'Lait pour bébé N° 1',
    'كريم مرطب للبشرة': 'Crème hydratante',
    'صابون طبي مضاد للبكتيريا': 'Savon médical antibactérien',
    
    '1كغ': '1 kg',
    '2كغ': '2 kg',
    '5كغ': '5 kg',
    '250مل': '250 ml',
    '500مل': '500 ml',
    '1ل': '1 L',
    '250غ': '250 g',
    '500غ': '500 g',
    
    // Pharmacy expansions
    'قطرة أوتريفين للأطفال': 'Gouttes Otrivin Enfants',
    'مرهم جينوداكتارين': 'Crème Gynodaktarin',
    'ميزان حرارة رقمي': 'Thermomètre digital',
    'شاش معقم': 'Gaze stérile',
    'حقنة طبية 5مل': 'Seringue médicale 5ml'
  }
};

const DEFAULT_DATA = {
  restaurant: { categories:['وجبات رئيسية','مشاوي','مقبلات','مشروبات','حلويات'], products:[
    {id:'r1',name:'برجر لحم',price:250,category:'وجبات رئيسية',stock:999,emoji:'🍔'}, 
    {id:'r2',name:'بيتزا مارغريتا',price:350,category:'وجبات رئيسية',stock:999,emoji:'🍕'}, 
    {id:'r3',name:'شاورما دجاج',price:200,category:'وجبات رئيسية',stock:999,emoji:'🌯'}, 
    {id:'r4',name:'كباب مشوي',price:400,category:'مشاوي',stock:999,emoji:'🍢'}, 
    {id:'r5',name:'دجاج مشوي',price:450,category:'مشاوي',stock:999,emoji:'🍗'}, 
    {id:'r6',name:'سمك مشوي',price:550,category:'مشاوي',stock:999,emoji:'🐟'}, 
    {id:'r7',name:'تبولة',price:120,category:'مقبلات',stock:999,emoji:'🥗'}, 
    {id:'r8',name:'حمص',price:100,category:'مقبلات',stock:999,emoji:'🫘'}, 
    {id:'r9',name:'كولا',price:50,category:'مشروبات',stock:999,emoji:'🥤'}, 
    {id:'r10',name:'عصير برتقال',price:80,category:'مشروبات',stock:999,emoji:'🍊'}, 
    {id:'r11',name:'كنافة',price:150,category:'حلويات',stock:999,emoji:'🍮'}, 
    {id:'r12',name:'أم علي',price:180,category:'حلويات',stock:999,emoji:'🍨'}
  ]},
  grocery: { categories:['مواد غذائية','مشروبات','منظفات','ألبان','خضار وفواكه'], products:[
    {id:'g1',name:'أرز بسمتي',category:'مواد غذائية',emoji:'🌾',isWeightBased:true,variants:[
      {id:'v1',name:'1كغ',price:50,stock:100,barcode:'6001234567890-1'},
      {id:'v2',name:'2كغ',price:95,stock:50,barcode:'6001234567890-2'},
      {id:'v3',name:'5كغ',price:220,stock:30,barcode:'6001234567890'}
    ]},
    {id:'g2',name:'زيت زيتون',category:'مواد غذائية',emoji:'🫒',isWeightBased:true,variants:[
      {id:'v1',name:'250مل',price:100,stock:50,barcode:'6001234567891-1'},
      {id:'v2',name:'500مل',price:190,stock:40,barcode:'6001234567891-2'},
      {id:'v3',name:'1ل',price:350,stock:30,barcode:'6001234567891'}
    ]},
    {id:'g3',name:'سكر ناعم',category:'مواد غذائية',emoji:'🍬',isWeightBased:true,variants:[
      {id:'v1',name:'1كغ',price:65,stock:100,barcode:'6001234567892-1'},
      {id:'v2',name:'2كغ',price:120,stock:80,barcode:'6001234567892'}
    ]},
    {id:'g4',name:'حليب طازج',category:'ألبان',emoji:'🥛',isWeightBased:true,variants:[
      {id:'v1',name:'250مل',price:25,stock:50,barcode:'6001234567893-1'},
      {id:'v2',name:'500مل',price:45,stock:50,barcode:'6001234567893-2'},
      {id:'v3',name:'1ل',price:80,stock:40,barcode:'6001234567893'}
    ]},
    {id:'g5',name:'جبنة بيضاء',category:'ألبان',emoji:'🧀',isWeightBased:true,variants:[
      {id:'v1',name:'250غ',price:80,stock:30,barcode:'6001234567894-1'},
      {id:'v2',name:'500غ',price:150,stock:25,barcode:'6001234567894'},
      {id:'v3',name:'1كغ',price:290,stock:15,barcode:'6001234567894-3'}
    ]},
    {id:'g6',name:'زبادي طبيعي',price:60,category:'ألبان',stock:60,barcode:'6001234567895',emoji:'🍶'}, 
    {id:'g7',name:'كولا 2ل',price:100,category:'مشروبات',stock:100,barcode:'6001234567896',emoji:'🥤'}, 
    {id:'g8',name:'عصير برتقال 1ل',price:140,category:'مشروبات',stock:45,barcode:'6001234567897',emoji:'🍊'}, 
    {id:'g9',name:'ماء معدني 1.5ل',price:30,category:'مشروبات',stock:200,barcode:'6001234567898',emoji:'💧'}, 
    {id:'g10',name:'صابون جلي',price:180,category:'منظفات',stock:35,barcode:'6001234567899',emoji:'🧴'}, 
    {id:'g11',name:'طماطم طازجة',category:'خضار وفواكه',emoji:'🍅',isWeightBased:true,variants:[
      {id:'v1',name:'1كغ',price:50,stock:70,barcode:'6001234567900'},
      {id:'v2',name:'2كغ',price:95,stock:50,barcode:'6001234567900-2'},
      {id:'v3',name:'5كغ',price:230,stock:20,barcode:'6001234567900-5'}
    ]},
    {id:'g12',name:'موز بلدي',category:'خضار وفواكه',emoji:'🍌',isWeightBased:true,variants:[
      {id:'v1',name:'1كغ',price:90,stock:55,barcode:'6001234567901'},
      {id:'v2',name:'2كغ',price:170,stock:30,barcode:'6001234567901-2'}
    ]}
  ]},
  pharmacy: { categories:['أدوية وصفة','أدوية عامة','فيتامينات','مستلزمات طبية','عناية شخصية'], products:[
    {id:'p1',name:'بنادول اكسترا',price:150,category:'أدوية عامة',stock:100,emoji:'💊'},
    {id:'p2',name:'فيتامين سي فوار',price:200,category:'فيتامينات',stock:60,emoji:'🍊'},
    {id:'p3',name:'شراب السعال ديلسيم',price:280,category:'أدوية عامة',stock:30,emoji:'🧪'},
    {id:'p4',name:'ضمادات جروح طبية',price:50,category:'مستلزمات طبية',stock:150,emoji:'🩹'},
    {id:'p5',name:'كمامات طبية 50 حبة',price:150,category:'مستلزمات طبية',stock:80,emoji:'😷'},
    {id:'p6',name:'معقم جيل لليدين',price:100,category:'مستلزمات طبية',stock:90,emoji:'🧴'},
    {id:'p7',name:'جهاز قياس ضغط الدم',price:1500,category:'مستلزمات طبية',stock:10,emoji:'🩺'},
    {id:'p8',name:'قطرة مرطبة للعين',price:120,category:'أدوية عامة',stock:45,emoji:'💧'},
    {id:'p9',name:'حليب أطفال رقم 1',price:380,category:'عناية شخصية',stock:20,emoji:'🍼'},
    {id:'p10',name:'كريم مرطب للبشرة',price:350,category:'عناية شخصية',stock:25,emoji:'🧴'},
    {id:'p11',name:'صابون طبي مضاد للبكتيريا',price:90,category:'عناية شخصية',stock:60,emoji:'🧼'},
    {id:'p12',name:'قطرة أوتريفين للأطفال',price:180,category:'أدوية عامة',stock:40,emoji:'💧'},
    {id:'p13',name:'مرهم جينوداكتارين',price:290,category:'أدوية عامة',stock:35,emoji:'🧪'},
    {id:'p14',name:'ميزان حرارة رقمي',price:450,category:'مستلزمات طبية',stock:15,emoji:'🌡️'},
    {id:'p15',name:'شاش معقم',price:40,category:'مستلزمات طبية',stock:120,emoji:'🩹'},
    {id:'p16',name:'حقنة طبية 5مل',price:15,category:'مستلزمات طبية',stock:250,emoji:'💉'}
  ]}
};

const EMOJI_CATEGORIES = {
  fruits: { labelKey: 'catFruits', list: ['🍎','🍏','🍊','🍋','🍌','🍉','🍇','🍓','🫒','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧅','🥔','🍠','🍍','🥭','🥥','🥝','🍒','🍑'] },
  meals: { labelKey: 'catMeals', list: ['🍞','🥖','🥐','🍳','🥩','🍗','🍖','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🥙','🧆','🥘','🍲','🥗','🍿','🍱','🥟','🍤','🐟','🦀','🦞','🐙'] },
  sweets: { labelKey: 'catSweets', list: ['🎂','🍰','🧁','🥧','🍩','🍪','🍫','🍬','🍭','🍮','🍯','🍨','🍦','🥜','🫘'] },
  drinks: { labelKey: 'catDrinks', list: ['💧','🥛','🥤','🧃','☕','🫖','🍵','🍶','🧋','🍾'] },
  cleaning: { labelKey: 'catCleaning', list: ['🧼','🧽','🧴','🧹','🧺','🧻','🗑️','🕯️'] },
  pharmacy: { labelKey: 'catPharmacy', list: ['💊','💉','🩹','🩺','🧪','😷','🧴','🧼','🩻','🦷','👓','🦼','🩼','🩸','🫁','🧬','🧫','🍼','🌡️','🏥','🚑','🥼','🫀','🧠','👁️','👂','👃','🦴','🦾','🦿'] },
  books: { labelKey: 'catBooks', list: ['📚','📖','📕','📗','📘','📙','📒','📓','📝','✏️','🖊️','🖍️','🖇️','📎','📐','🎒','🔖','🗂️','📰','📔','🗃️','🗓️','📅','🧮','📏','🖋️','✒️','🖌️','🗑️'] },
  electronics: { labelKey: 'catElectronics', list: ['📱','💻','⌨️','🖥️','🖨️','🖱️','🎧','🎮','📷','📺','⌚','🔋','🔌','💡','🔦','📡','🎙️','📀','🎛️','⏱️','⏲️','⏰','🖲️','🔌','🔋','🧯','🖲️'] },
  clothing: { labelKey: 'catClothing', list: ['👕','👔','👗','👚','🧥','🥼','🦺','👖','🩳','👟','👞','👠','🥾','🧢','🎩','🧤','🧣','👜','🎒','👑','👛','👝','💼','🕶️','💍','👠','🩴','🧦'] },
  general: { labelKey: 'catGeneral', list: ['📦','🛍️','🏷️','🎁','🛒','🍽️','🏪','💰','🧾','🪑','🔧','🧸','🔑','🛎️','🚪','💈','🪞','🧴','🧼','🪥'] }
};

function t(key) {
  return (i18n[state.lang || 'ar'] && i18n[state.lang || 'ar'][key]) || (i18n['ar'] && i18n['ar'][key]) || key;
}

let state = {
  mode: null,
  screen: 'pos',
  category: 'الكل',
  query: '',
  cart: [],
  data: load(STORAGE, clone(DEFAULT_DATA)),
  orders: load(ORDERS, []),
  user: loadSessionUser(),
  token: sessionStorage.getItem('pos_token'),
  subscription: null,
  invLog: load(INVLOG, []),
  lang: localStorage.getItem('pos_lang') || 'ar',
  showNewSub: false,
  staffList: [],
  adminRequestsList: [],
  adminTabStatus: 'pending',
  settings: {
    logo: '',
    whatsappEnabled: true,
    name: 'نقطة بيع موريتانيا',
    phone: '41010021',
    address: 'نواكشوط، موريتانيا',
    footer: 'شكراً لتعاملكم معنا!',
    showLogo: true,
    showPhone: true,
    showAddress: true,
    showFooter: true,
    ...load('pos_settings', {})
  }
};
let currentEmojiCategory = 'fruits';

function load(key, fallback){try{return JSON.parse(localStorage.getItem(key)) || fallback}catch{return fallback}}
function loadSessionUser(){try{return JSON.parse(sessionStorage.getItem('pos_user')) || null}catch{return null}}
function persist(){
  localStorage.setItem(STORAGE,JSON.stringify(state.data));
  localStorage.setItem(ORDERS,JSON.stringify(state.orders));
  localStorage.setItem(INVLOG, JSON.stringify(state.invLog));
  localStorage.setItem('pos_lang', state.lang);
  localStorage.setItem('pos_settings', JSON.stringify(state.settings));
}

const API_BASE = window.POS_API_BASE || (['localhost', '127.0.0.1'].includes(window.location.hostname) && window.location.port !== '3001' ? 'http://localhost:3001/api' : '/api');

function saveAuthSession(token, user) {
  state.token = token;
  state.user = user;
  sessionStorage.setItem('pos_token', token);
  sessionStorage.setItem('pos_user', JSON.stringify(user));
}

function clearAuthSession() {
  state.token = null;
  state.user = null;
  state.subscription = null;
  sessionStorage.removeItem('pos_token');
  sessionStorage.removeItem('pos_user');
}

async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  if (options.body) headers['Content-Type'] = 'application/json';

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch (netErr) {
    // الخادم غير متصل — استخدام الوضع التجريبي المحلي الاحتياطي
    if (path === '/login' && options.body) {
      const body = JSON.parse(options.body);
      const username = body.username;
      if (username === 'admin' || username === 'super_admin') {
        return { token: 'demo_super_admin_token', user: { id: 'sa-1', name: 'المشرف العام (تجريبي)', role: 'super_admin', businessId: null } };
      } else if (username === 'manager') {
        return { token: 'demo_manager_token', user: { id: 'm-1', name: 'المدير العام (تجريبي)', role: 'manager', businessId: 'b-1' } };
      } else if (username === 'cashier') {
        return { token: 'demo_cashier_token', user: { id: 'c-1', name: 'الكاشير (تجريبي)', role: 'cashier', businessId: 'b-1' } };
      } else if (username === 'storekeeper') {
        return { token: 'demo_storekeeper_token', user: { id: 'sk-1', name: 'مسؤول المخزن (تجريبي)', role: 'storekeeper', businessId: 'b-1' } };
      }
    } else if (path === '/subscription') {
      return { status: 'active', expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() };
    } else if (path === '/staff' && options.method === 'GET') {
      return { staff: state.staffList || [] };
    } else if (path === '/admin/payment-requests' && options.method === 'GET') {
      return { requests: state.adminRequestsList || [] };
    }
    throw new Error('تعذّر الاتصال بالخادم الرئيسي (' + API_BASE + ')');
  }

  const payload = await response.json().catch(() => ({}));

  if (response.status === 401) {
    clearAuthSession();
    render();
    throw new Error(payload.error || 'جلسة غير صالحة أو تم تعطيل الحساب');
  }
  if (response.status === 402) {
    state.subscription = { status: 'expired', expires_at: payload.expires_at || null };
    render();
    throw new Error(payload.error || 'انتهى اشتراك المحل');
  }
  if (!response.ok) throw new Error(payload.error || 'فشلت العملية');
  return payload;
}

async function refreshSubscription() {
  if (!state.token || !state.user) return;
  try {
    state.subscription = await apiRequest('/subscription');
  } catch {
    return;
  }
  render();
}

// تسجيل حركة مخزن
function logInv({ type, productName, emoji, variant, qty, mode, user }) {
  state.invLog.unshift({
    id: id(),
    date: new Date().toISOString(),
    type,          // 'add_product' | 'edit_product' | 'stock_in' | 'stock_out'
    productName,
    emoji: emoji || '📦',
    variant: variant || null,
    qty,
    mode,
    user: user || (state.user ? state.user.name : 'غير محدد')
  });
  // احتفظ بآخر 500 حركة فقط
  if (state.invLog.length > 500) state.invLog = state.invLog.slice(0, 500);
}
function toast(text, type='success'){
  const node=document.createElement('div');
  node.className='toast '+(type==='error'?'error':'');
  node.textContent=text;
  document.querySelector('#toast-region').append(node);
  setTimeout(()=>node.remove(),3000);
}
function cur(){return state.data[state.mode]}
function usesInventory(mode = state.mode){ return mode === 'grocery' || mode === 'pharmacy'; }
function cartCount(){return state.cart.reduce((sum,item)=>sum+item.qty,0)}
function total(){return state.cart.reduce((sum,item)=>sum+item.qty*item.price,0)}

function isSubscribed() {
  if (!state.subscription || state.subscription.status !== 'active') return false;
  return !state.subscription.expires_at || new Date(state.subscription.expires_at) > new Date();
}

function subscriptionDaysLeft() {
  if (!state.subscription?.expires_at) return 0;
  return Math.max(0, Math.ceil((new Date(state.subscription.expires_at) - Date.now()) / (24 * 60 * 60 * 1000)));
}

function checkScreenPermissions() {
  if (!state.user) return;
  if (state.user.role === 'cashier' && state.screen !== 'pos') {
    state.screen = 'pos';
  } else if (state.user.role === 'storekeeper' && state.screen !== 'inventory') {
    state.screen = 'inventory';
  }
}

function loginScreen() {
  return `
    <section class="login-container animate-fade-in">
      <div class="login-card" style="max-width: 440px;">
        <div class="lang-selector" style="margin-bottom: 20px; align-self: center;">
          <button type="button" class="lang-btn ${state.lang === 'ar' ? 'active' : ''}" data-action="set-lang" data-lang="ar">AR</button>
          <button type="button" class="lang-btn ${state.lang === 'en' ? 'active' : ''}" data-action="set-lang" data-lang="en">EN</button>
          <button type="button" class="lang-btn ${state.lang === 'fr' ? 'active' : ''}" data-action="set-lang" data-lang="fr">FR</button>
        </div>
        
        <div class="login-logo">🔓</div>
        <h1 class="login-title">${t('loginTitle')}</h1>
        <p class="login-sub">${t('loginSub')}</p>
        
        <form id="login-form">
          <div class="field">
            <label>${t('usernameField')}</label>
            <input required type="text" name="username" placeholder="${t('usernamePlaceholder')}">
          </div>
          <div class="field">
            <label>${t('passwordField')}</label>
            <input required type="password" name="password" placeholder="${t('passwordPlaceholder')}">
          </div>
          <button class="primary" style="margin-top: 10px; width: 100%;" type="submit">${t('loginBtn')}</button>
        </form>

        <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border);">
          <p style="color:var(--muted); font-size:12px; text-align:center; margin:0 0 10px;">
            ⚡ ${t('quickLogin')}
          </p>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
            <button type="button" class="ghost" data-action="quick-login" data-user="admin" data-pass="admin2007" style="font-size:11px; padding:8px 4px; text-align:center;">
              🛡️ مشرف عام
            </button>
            <button type="button" class="ghost" data-action="quick-login" data-user="manager" data-pass="manager2007" style="font-size:11px; padding:8px 4px; text-align:center;">
              👑 مدير عام
            </button>
            <button type="button" class="ghost" data-action="quick-login" data-user="cashier" data-pass="cashier2007" style="font-size:11px; padding:8px 4px; text-align:center;">
              🛒 كاشير
            </button>
            <button type="button" class="ghost" data-action="quick-login" data-user="storekeeper" data-pass="storekeeper2007" style="font-size:11px; padding:8px 4px; text-align:center;">
              📦 مسؤول مخزن
            </button>
          </div>
        </div>

        <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border); text-align: center;">
          <button type="button" class="ghost" id="btn-new-subscription" data-action="show-new-sub"
            style="width: 100%; color: var(--primary); border-color: var(--primary); padding: 12px; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            🏪 ${t('newSubscriptionLink')}
          </button>
        </div>
        
      </div>
    </section>
  `;
}

// ======================================================
// SPEC 002 — شاشة طلب اشتراك جديد
// ======================================================
function newSubscriptionScreen(pendingResult = null) {
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  if (pendingResult) {
    // عرض صفحة النجاح بعد الإرسال
    return `
      <section class="login-container animate-fade-in">
        <div class="login-card">
          <div class="sub-logo" style="font-size:52px; margin-bottom:16px">✅</div>
          <h1 class="login-title" style="color: var(--green); font-size:20px;">${t('requestPendingTitle')}</h1>
          <p style="color: var(--muted); font-size:14px; text-align:center; margin-bottom:16px;">${t('requestPendingMsg')}</p>

          <div style="background: var(--green-glow); border: 1px solid var(--green); border-radius: 16px; padding: 20px; text-align:center; margin-bottom: 16px;">
            <div style="font-size:30px; margin-bottom:8px">📲</div>
            <strong style="color: var(--green); font-size:24px; font-family:monospace;">41010021</strong>
            <p style="color:var(--muted); font-size:12px; margin:8px 0 0;">WhatsApp</p>
          </div>

          <p style="color: var(--muted); font-size: 12px; text-align:center; margin-bottom:24px; line-height:1.6;">${t('requestPendingNote')}</p>

          <button type="button" class="primary" data-action="back-to-login" style="width:100%;">
            ← ${t('backToLoginLink')}
          </button>
        </div>
      </section>
    `;
  }

  return `
    <section class="login-container animate-fade-in">
      <div class="login-card" style="max-width: 460px;">
        <div class="lang-selector" style="margin-bottom: 20px; align-self: center;">
          <button type="button" class="lang-btn ${state.lang === 'ar' ? 'active' : ''}" data-action="set-lang" data-lang="ar">AR</button>
          <button type="button" class="lang-btn ${state.lang === 'en' ? 'active' : ''}" data-action="set-lang" data-lang="en">EN</button>
          <button type="button" class="lang-btn ${state.lang === 'fr' ? 'active' : ''}" data-action="set-lang" data-lang="fr">FR</button>
        </div>

        <div style="font-size:48px; text-align:center; margin-bottom:8px;">🏪</div>
        <h1 class="login-title" style="font-size:20px;">${t('newSubscriptionTitle')}</h1>
        <p class="login-sub" style="font-size:13px;">${t('newSubscriptionDesc')}</p>

        <form id="new-sub-form" style="display:flex; flex-direction:column; gap:14px; margin-top:16px;" direction="${dir}">

          <div class="field">
            <label>${t('bankNameLabel')}</label>
            <input required type="text" name="bank_name" placeholder="${t('bankNamePlaceholder')}">
            <small style="color:var(--muted); font-size:11px; margin-top:4px; display:block;">
              ${state.lang === 'ar' ? '⚠️ هذا الاسم يُستخدم للتحقق من هويتك عبر صورة التحويل.' : '⚠️ This name will be used to verify your identity via the transfer receipt.'}
            </small>
          </div>

          <div class="field">
            <label>${t('phoneLabel')}</label>
            <input required type="tel" name="phone" placeholder="${t('phonePlaceholder')}" dir="ltr">
          </div>

          <div class="field">
            <label>${t('shopNameLabel')}</label>
            <input required type="text" name="business_name" placeholder="${t('shopNamePlaceholder')}">
          </div>

          <div style="border-top:1px solid var(--border); padding-top:14px;">
            <p style="color:var(--primary); font-size:12px; font-weight:600; margin:0 0 10px;">
              🔐 ${state.lang === 'ar' ? 'بيانات حساب المدير' : state.lang === 'fr' ? 'Informations du compte gérant' : 'Manager Account Details'}
            </p>
            <div class="field">
              <label>${t('requestedUsernameLabel')}</label>
              <input required type="text" name="username" placeholder="${t('requestedUsernamePlaceholder')}" dir="ltr" autocomplete="off">
            </div>
            <div class="field" style="margin-top:10px;">
              <label>${t('requestedPasswordLabel')}</label>
              <input required type="password" name="password" placeholder="${t('requestedPasswordPlaceholder')}" autocomplete="new-password" minlength="4">
            </div>
          </div>

          <div style="border-top:1px solid var(--border); padding-top:14px;">
            <label style="color:var(--gold); font-size:12px; font-weight:600; display:block; margin-bottom:6px;">
              📷 صورة إثبات التحويل البنكي (Bankily / Sadad إلى 41010021)
            </label>
            <input type="file" id="signup-receipt-file" accept="image/*" aria-label="صورة إثبات التحويل البنكي">
            <input type="hidden" name="receipt_image" id="signup-receipt-image-val">
            <div id="signup-receipt-preview" style="margin-top:8px; display:none; text-align:center;">
              <img id="signup-receipt-preview-img" alt="معاينة الإثبات البنكي" style="max-height:110px; border-radius:8px; border:1px solid var(--green);">
            </div>
            <small style="color:var(--muted); font-size:11px; margin-top:4px; display:block;">
              يمكنك رفع صورة التحويل هنا أو إرسالها مباشرة عبر الواتساب إلى <strong>41010021</strong>.
            </small>
          </div>

          <button class="primary" type="submit" style="width:100%; margin-top:6px;">${t('submitRequestBtn')}</button>
        </form>

        <div style="margin-top:16px; text-align:center;">
          <button type="button" class="ghost" data-action="back-to-login"
            style="width:100%; font-size:13px; padding:10px;">
            ← ${t('backToLoginLink')}
          </button>
        </div>

      </div>
    </section>
  `;
}

async function handleNewSubscriptionSubmit(event) {
  event.preventDefault();
  const formEl = event.currentTarget;
  const values = Object.fromEntries(new FormData(formEl));
  const submitBtn = formEl.querySelector('[type="submit"]');
  submitBtn.disabled = true;

  try {
    await apiRequest('/signup-requests', {
      method: 'POST',
      body: JSON.stringify({
        bank_name: values.bank_name.trim(),
        phone: values.phone.trim(),
        business_name: values.business_name.trim(),
        username: values.username.trim(),
        password: values.password,
        receipt_image: values.receipt_image || null
      })
    });
    // نجاح — عرض صفحة التأكيد
    state.showNewSub = 'done';
    render();
  } catch (error) {
    toast(error.message || t('staffSaveError'), 'error');
    submitBtn.disabled = false;
  }
}


// شاشة تفعيل الاشتراك — للمدير فقط
function subscriptionScreenManager() {
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  return `
    <section class="sub-container animate-fade-in">
      <div class="sub-card">
        <div class="sub-logo">💳</div>
        <h1 class="sub-title">${t('subExpiredTitle')}</h1>
        <p class="sub-desc">${t('subExpiredDesc')}</p>
        
        <div class="payment-instructions" style="text-align: ${state.lang === 'ar' ? 'right' : 'left'}; direction: ${dir};">
          <div class="inst-header">${t('paymentMethod')}</div>
          <p>${t('sendSubAmount')} <strong style="color:var(--gold);">300 ${t('currency')}</strong> ${state.lang === 'ar' ? 'إلى الرقم التالي:' : state.lang === 'fr' ? 'au numéro suivant :' : 'to the following number:'}</p>
          <div class="phone-number-box">
            <span class="label">${t('receiverPhone')}</span>
            <strong class="number">41010021</strong>
          </div>
          
          <div class="apps-grid">
            <div class="app-card bankily">
              <div class="app-icon">📲</div>
              <strong>${t('bankilyApp')}</strong>
              <span>${t('transferTo')}</span>
            </div>
            <div class="app-card sadad">
              <div class="app-icon">📱</div>
              <strong>${t('sadadApp')}</strong>
              <span>${t('transferTo')}</span>
            </div>
          </div>
          
          <ol class="inst-steps" style="${state.lang === 'ar' ? 'padding-right: 20px;' : 'padding-left: 20px;'}">
            <li>${t('step1')}</li>
            <li>${t('step2')}</li>
            <li>${t('step3')}</li>
          </ol>
        </div>

        <form id="subscription-form">
          <div class="field">
            <label>${t('txnLabel')}</label>
            <input required type="text" name="transactionId" placeholder="e.g. TXN98765432" style="text-align: center; letter-spacing: 2px;">
          </div>
          <button class="primary" type="submit" style="width: 100%;">${t('subConfirmBtn')}</button>
        </form>

        <div style="margin-top: 15px; text-align: center;">
          <button class="ghost" data-action="logout" style="width: 100%; border-color: var(--red); color: var(--red); padding: 10px; font-size: 12px;">${t('logoutBtn')}</button>
        </div>
      </div>
    </section>
  `;
}

// شاشة التحذير — للكاشير ومسؤول المخزن عند انتهاء الاشتراك
function subscriptionWarningScreen() {
  const userName = state.user ? state.user.name : '';
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  return `
    <section class="sub-container animate-fade-in">
      <div class="sub-card">
        <div class="sub-logo" style="filter: drop-shadow(0 8px 20px rgba(248,113,113,0.4));">🚫</div>
        <h1 class="sub-title" style="background: linear-gradient(135deg, #f87171, #fca5a5); -webkit-background-clip: text;">${t('serviceSuspended')}</h1>
        <p class="sub-desc" style="color: var(--red);">${t('serviceSuspendedDesc')}</p>
        
        <div style="background: var(--red-glow); border: 1px solid rgba(248,113,113,0.3); border-radius: 20px; padding: 25px; margin: 20px 0; text-align: center;">
          <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
          <strong style="color: var(--red); font-size: 15px; display: block; margin-bottom: 8px;">${t('subExpired')}</strong>
          <p style="color: var(--muted); font-size: 13px; margin: 0;">${t('subExpiredMsg')}</p>
        </div>

        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 18px; text-align: ${state.lang === 'ar' ? 'right' : 'left'}; font-size: 13px; color: var(--muted); direction: ${dir};">
          <strong style="color: var(--primary); display: block; margin-bottom: 8px;">📞 ${t('supportDetails')}</strong>
          <p style="margin: 0;">${t('renewalPhone')} <strong style="color: var(--gold); font-family: monospace;">41010021</strong></p>
          <p style="margin: 4px 0 0;">${t('monthlyFee')} <strong style="color: var(--gold);">300 ${t('currency')}</strong> (Bankily / Sadad)</p>
        </div>
        
        ${userName ? `<p style="color: var(--muted); font-size: 12px; margin-top: 20px;">${t('loggedInAs')} <strong style="color: var(--text);">${e(userName)}</strong></p>` : ''}
        <button class="ghost" data-action="logout" style="width: 100%; border-color: var(--border); color: var(--muted); padding: 10px; font-size: 12px; margin-top: 10px;">${t('logoutBtn')}</button>
      </div>
    </section>
  `;
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const formEl = event.currentTarget;
  const values = Object.fromEntries(new FormData(formEl));
  const submitButton = formEl.querySelector('[type="submit"]');
  submitButton.disabled = true;

  try {
    const result = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ username: values.username, password: values.password })
    });
    saveAuthSession(result.token, result.user);
    state.screen = result.user.role === 'storekeeper' ? 'inventory' : 'pos';
    await refreshSubscription();
    toast(t('welcomeBackToast') + ' ' + result.user.name);
  } catch (error) {
    toast(error.message || t('loginErrorToast'), 'error');
  } finally {
    submitButton.disabled = false;
  }
}

async function handleSubscriptionSubmit(event) {
  event.preventDefault();
  const formEl = event.currentTarget;
  const values = Object.fromEntries(new FormData(formEl));
  const txn = values.transactionId.trim();
  if (txn.length < 4) return toast(t('enterValidTxnToast'), 'error');

  try {
    const result = await apiRequest('/payment-requests', {
      method: 'POST',
      body: JSON.stringify({ transaction_id: txn })
    });
    toast(result.message || t('checkoutSuccess'));
    formEl.reset();
    await refreshSubscription();
  } catch (error) {
    toast(error.message || t('enterValidTxnToast'), 'error');
  }
}

function showSubscriptionModal() {
  const box = document.createElement('div');
  box.className = 'modal-backdrop';
  
  const expiryDate = new Date(state.subscription?.expires_at).toLocaleDateString(state.lang === 'ar' ? 'ar-MR' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  box.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <h2>💳 ${state.lang === 'ar' ? 'تفاصيل الاشتراك الشهري' : 'Subscription Details'}</h2>
        <button type="button" class="close" data-action="close-modal">×</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 16px; font-size: 14px; line-height: 1.6;">
        <div class="status-card active" style="background: var(--green-glow); border: 1px solid var(--green); border-radius: 12px; padding: 15px; text-align: center;">
          <span style="font-size: 32px;">✅</span>
          <h3 style="color: var(--green); margin: 10px 0 5px;">${t('subActive')}</h3>
          <p style="margin: 0; color: var(--muted);">${t('expiresIn')}: <strong style="color: var(--text);">${expiryDate}</strong></p>
        </div>
        
        <div style="border-top: 1px solid var(--border); padding-top: 15px;">
          <h4 style="margin: 0 0 10px; color: var(--primary);">${state.lang === 'ar' ? 'تجديد أو تمديد الاشتراك:' : 'Renew or Extend Subscription:'}</h4>
          <p style="margin: 0 0 10px;">${state.lang === 'ar' ? 'يمكنك تجديد اشتراكك بإرسال <strong>300 أوقية</strong> للرقم <strong>41010021</strong> وإدخال رقم العملية الجديد:' : 'You can renew by sending <strong>300 UM</strong> to <strong>41010021</strong> and entering the transaction ID below:'}</p>
          
          <form id="renew-subscription-form" style="display: flex; flex-direction: column; gap: 10px;">
            <input required type="text" name="transactionId" placeholder="${state.lang === 'ar' ? 'رقم العملية المرجعي الجديد' : 'New Transaction Reference ID'}" style="text-align: center;">
            <button class="primary" type="submit" style="width: 100%;">${state.lang === 'ar' ? 'تحديث الاشتراك' : 'Update Subscription'}</button>
          </form>
        </div>
      </div>
    </div>
  `;
  document.body.append(box);
  
  const form = box.querySelector('#renew-subscription-form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const val = form.elements.transactionId.value.trim();
    if (val.length >= 4) {
      try {
        const result = await apiRequest('/payment-requests', {
          method: 'POST',
          body: JSON.stringify({ transaction_id: val })
        });
      box.remove();
        toast(result.message || t('checkoutSuccess'));
        await refreshSubscription();
      } catch (error) {
        toast(error.message || t('enterValidTxnToast'), 'error');
      }
    } else {
      toast(t('enterValidTxnToast'), 'error');
    }
  });
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  const formEl = event.currentTarget;
  const values = Object.fromEntries(new FormData(formEl));
  state.settings = {
    logo: state.settings.logo || '',
    whatsappEnabled: values.whatsappEnabled === 'on',
    name: values.name.trim(),
    phone: values.phone.trim(),
    address: values.address.trim(),
    footer: values.footer.trim(),
    showLogo: values.showLogo === 'on',
    showPhone: values.showPhone === 'on',
    showAddress: values.showAddress === 'on',
    showFooter: values.showFooter === 'on'
  };
  persist();
  toast(t('saveSettingsSuccess'));
  render();
}

function handleLogoUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 1024 * 1024) {
    toast(t('invalidLogoToast'), 'error');
    event.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.settings.logo = reader.result;
    persist();
    toast(t('logoSavedToast'));
    render();
  };
  reader.readAsDataURL(file);
}

function storeSettings() {
  const settings = state.settings;
  const currency = t('currency');
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  
  return `
    <section class="page animate-fade-in">
      <div class="page-head">
        <div>
          <h1>⚙️ ${t('storeSettingsTitle')}</h1>
          <p>${t('storeSettingsDesc')}</p>
        </div>
      </div>
      
      <div class="settings-layout" style="display: flex; gap: 32px; padding: 24px; max-width: 1000px; margin: 0 auto; flex-wrap: wrap;">
        <!-- Left Column: Settings Form -->
        <div class="table" style="padding: 24px; flex: 1.2; min-width: 320px; margin: 0;">
          <form id="store-settings-form" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="field">
              <label>${t('storeName')} *</label>
              <input required type="text" name="name" value="${e(settings.name)}">
            </div>
            
            <div class="field">
              <label>${t('logoLabel')}</label>
              <div class="logo-upload-row">
                <div class="logo-preview">${settings.logo ? `<img src="${e(settings.logo)}" alt="logo">` : '🏪'}</div>
                <div>
                  <input id="store-logo-input" type="file" accept="image/png,image/jpeg,image/webp" aria-label="Store logo">
                  <small>${t('logoFormat')}</small>
                </div>
                ${settings.logo ? `<button type="button" class="ghost" data-action="clear-logo">${t('removeLogoBtn')}</button>` : ''}
              </div>
            </div>
            
            <div class="field">
              <label>${t('storePhone')} *</label>
              <input required type="text" name="phone" value="${e(settings.phone)}">
            </div>
            
            <div class="field">
              <label>${t('storeAddress')} *</label>
              <input required type="text" name="address" value="${e(settings.address)}">
            </div>
            
            <div class="field">
              <label>${t('storeFooter')}</label>
              <input type="text" name="footer" value="${e(settings.footer)}">
            </div>
            
            <div class="field" style="border-top:1px solid var(--border); padding-top:16px; display:flex; flex-direction:column; gap:10px;">
              <label style="font-weight:bold; color:var(--primary);">${t('displayOptionsTitle')}</label>
              <label class="settings-check">
                <input type="checkbox" name="showLogo" ${settings.showLogo ? 'checked' : ''}>
                <span>🖼️ ${t('showLogoLabel')}</span>
              </label>
              <label class="settings-check">
                <input type="checkbox" name="showPhone" ${settings.showPhone ? 'checked' : ''}>
                <span>📞 ${t('showPhoneLabel')}</span>
              </label>
              <label class="settings-check">
                <input type="checkbox" name="showAddress" ${settings.showAddress ? 'checked' : ''}>
                <span>📍 ${t('showAddressLabel')}</span>
              </label>
              <label class="settings-check">
                <input type="checkbox" name="showFooter" ${settings.showFooter ? 'checked' : ''}>
                <span>📝 ${t('showFooterLabel')}</span>
              </label>
            </div>
            
            <label class="settings-check" style="border-top:1px solid var(--border); padding-top:16px;">
              <input type="checkbox" name="whatsappEnabled" ${settings.whatsappEnabled ? 'checked' : ''}>
              <span>💬 ${t('whatsappCheckLabel')}</span>
            </label>
            
            <button class="primary" type="submit" style="margin-top: 10px; width: 100%;">${t('saveSettings')}</button>
          </form>
        </div>
        
        <!-- Right Column: Live Receipt Preview -->
        <div class="receipt-preview-wrapper" style="flex: 0.8; min-width: 300px; display: flex; justify-content: center; align-items: flex-start;">
          <div class="receipt-preview-container" style="width: 100%; max-width: 360px; background: #fff; color: #000; padding: 24px; border-radius: 16px; border: 1px dashed #ccc; box-shadow: var(--shadow-lg); font-family: sans-serif; text-align: center; direction: ${dir};">
            <div style="font-size: 11px; color: #888; margin-bottom: 12px; border-bottom: 1px dashed #eee; padding-bottom: 6px; font-weight: bold; text-align: center;">
              👀 ${t('receiptPreviewTitle')}
            </div>
            
            <div id="preview-logo" class="receipt-logo" style="margin-bottom: 8px; display: ${settings.showLogo ? 'grid' : 'none'}; justify-content: center; align-items: center; width: 56px; height: 56px; margin-inline: auto; overflow: hidden;">
              ${settings.logo ? `<img src="${e(settings.logo)}" alt="logo" style="width:100%; height:100%; object-fit:contain;">` : '🏪'}
            </div>
            
            <h3 id="preview-name" style="margin: 0 0 4px 0; font-size: 18px; font-weight: bold; color: #000;">${e(settings.name)}</h3>
            <div id="preview-phone" style="font-size: 11px; color: #666; margin-bottom: 4px; display: ${settings.showPhone ? 'block' : 'none'};">📞 ${e(settings.phone)}</div>
            <div id="preview-address" style="font-size: 11px; color: #666; margin-bottom: 12px; display: ${settings.showAddress ? 'block' : 'none'};">📍 ${e(settings.address)}</div>
            
            <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 6px 0; margin-bottom: 12px; font-size: 11px; display: flex; justify-content: space-between; color: #333; direction: ltr;">
              <span>ID: #preview-123</span>
              <span>15/07/2026 19:12</span>
            </div>
            
            <div style="text-align: right; margin-bottom: 12px; direction: ${dir};">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; color: #000;">
                <span>${t('sampleProductLabel')} (x1)</span>
                <span>250 ${currency}</span>
              </div>
            </div>
            
            <div style="border-top: 1px dashed #000; padding-top: 8px; font-size: 14px; font-weight: bold; display: flex; justify-content: space-between; margin-bottom: 16px; color: #000;">
              <span>${t('total')}</span>
              <span>250 ${currency}</span>
            </div>
            
            <p id="preview-footer" style="margin: 0; font-size: 11px; border-top: 1px dashed #000; padding-top: 8px; color: #666; display: ${settings.showFooter && settings.footer ? 'block' : 'none'};">${e(settings.footer)}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function sendReceiptWhatsapp(order, phone) {
  const settings = state.settings;
  const currency = t('currency');
  
  let text = `*${settings.name}*\n`;
  if (settings.showPhone || settings.showAddress) {
    let details = [];
    if (settings.showPhone) details.push(`📞 ${settings.phone}`);
    if (settings.showAddress) details.push(`📍 ${settings.address}`);
    text += details.join(' | ') + '\n';
  }
  text += `----------------------------------\n`;
  text += `📄 *${t('receiptTitle')}*\n`;
  text += `📅 ${new Date(order.date).toLocaleString(state.lang === 'ar' ? 'ar-MR' : 'en-US')}\n`;
  text += `----------------------------------\n`;
  
  order.items.forEach(item => {
    // Translate the item name appropriately
    const transName = t(item.productName || item.name);
    const transVar = item.variantName ? ` (${t(item.variantName)})` : '';
    text += `- ${transName}${transVar} x${item.qty} = ${item.price * item.qty} ${currency}\n`;
  });
  
  text += `----------------------------------\n`;
  text += `*${t('total')}: ${order.total} ${currency}*\n`;
  text += `----------------------------------\n`;
  
  if (settings.showFooter && settings.footer) {
    text += `${settings.footer}`;
  }
  
  const encodedText = encodeURIComponent(text);
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  
  const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
  window.open(url, '_blank');
}

function showReceiptModal(order) {
  const box = document.createElement('div');
  box.className = 'modal-backdrop';
  
  const settings = state.settings;
  const currency = t('currency');
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  
  box.innerHTML = `
    <div class="modal receipt-modal-box" style="max-width: 440px; font-family: sans-serif;">
      <div class="modal-head">
        <h2>🧾 ${t('receiptTitle')}</h2>
        <button type="button" class="close" data-action="close-modal">×</button>
      </div>
      
      <!-- Receipt Print Container -->
      <div id="receipt-print-area" class="receipt-print-container" style="background: #fff; color: #000; padding: 24px; border-radius: 12px; margin-bottom: 20px; text-align: center; border: 1px dashed #ccc; direction: ${dir};">
        <div class="receipt-logo" style="margin-bottom: 8px; display: ${settings.showLogo ? 'grid' : 'none'}; justify-content: center; align-items: center; width: 56px; height: 56px; margin-inline: auto; overflow: hidden;">
          ${settings.logo ? `<img src="${e(settings.logo)}" alt="${e(settings.name)} logo" style="width:100%; height:100%; object-fit:contain;">` : '🏪'}
        </div>
        
        <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: bold; color: #000;">${e(settings.name)}</h3>
        <div id="receipt-print-phone" style="font-size: 11px; color: #666; margin-bottom: 4px; display: ${settings.showPhone ? 'block' : 'none'};">📞 ${e(settings.phone)}</div>
        <div id="receipt-print-address" style="font-size: 11px; color: #666; margin-bottom: 12px; display: ${settings.showAddress ? 'block' : 'none'};">📍 ${e(settings.address)}</div>
        
        <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 6px 0; margin-bottom: 12px; font-size: 11px; display: flex; justify-content: space-between; color: #333; direction: ltr;">
          <span>ID: #${order.id.substring(0,8)}</span>
          <span>${new Date(order.date).toLocaleDateString(state.lang === 'ar' ? 'ar-MR' : 'en-US') + ' ' + new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
        
        <div style="text-align: right; margin-bottom: 12px; direction: ${dir};">
          ${order.items.map(item => {
            const transName = t(item.productName || item.name);
            const transVar = item.variantName ? ` (${t(item.variantName)})` : '';
            return `
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; color: #000;">
                <span>${e(transName)}${e(transVar)} (x${item.qty})</span>
                <span>${money(item.price * item.qty)} ${currency}</span>
              </div>
            `;
          }).join('')}
        </div>
        
        <div style="border-top: 1px dashed #000; padding-top: 8px; font-size: 14px; font-weight: bold; display: flex; justify-content: space-between; margin-bottom: 16px; color: #000;">
          <span>${t('total')}</span>
          <span>${money(order.total)} ${currency}</span>
        </div>
        
        <p id="receipt-print-footer" style="margin: 0; font-size: 11px; border-top: 1px dashed #000; padding-top: 8px; color: #666; display: ${settings.showFooter && settings.footer ? 'block' : 'none'};">${e(settings.footer)}</p>
      </div>
      
      <!-- Sharing options -->
      <div style="display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--border); padding-top: 16px;">
        ${settings.whatsappEnabled ? `
        <div class="field" style="margin-bottom: 0;">
          <label style="text-align: right; display: block;">${t('whatsappLabel')}</label>
          <input type="text" id="whatsapp-phone-input" value="222" style="text-align: center; font-size: 15px; letter-spacing: 1px; width: 100%;">
        </div>
        <button class="primary" id="btn-send-whatsapp-receipt" style="background: linear-gradient(135deg, #25D366, #128C7E); box-shadow: 0 4px 12px rgba(37,211,102,0.3); width: 100%;">
          ${t('sendWhatsappBtn')}
        </button>
        ` : ''}
        
        <div style="display: flex; gap: 8px;">
          <button class="ghost" id="btn-print-receipt" style="flex: 1; border-color: var(--primary); color: var(--primary); padding: 10px;">
            ${t('printBtn')}
          </button>
          <button class="ghost" type="button" data-action="close-modal" style="flex: 1; padding: 10px;">
            ${t('closeBtn')}
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.append(box);
  
  const waBtn = box.querySelector('#btn-send-whatsapp-receipt');
  waBtn?.addEventListener('click', () => {
    const phoneInput = box.querySelector('#whatsapp-phone-input').value.trim();
    if (phoneInput.length > 5) {
      sendReceiptWhatsapp(order, phoneInput);
    } else {
      toast(t('phoneError'), 'error');
    }
  });
  
  const printBtn = box.querySelector('#btn-print-receipt');
  printBtn.addEventListener('click', () => {
    const printContent = document.getElementById('receipt-print-area').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=400');
    printWindow.document.write('<html><head><title>Print Receipt</title>');
    printWindow.document.write('<style>body{font-family:sans-serif;padding:20px;text-align:center;color:#000;} div{margin-bottom:6px;}.receipt-logo{width:56px;height:56px;margin:0 auto 8px; display:grid; justify-content:center; align-items:center; overflow:hidden;} .receipt-logo img{width:100%;height:100%;object-fit:contain;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  });
}

function render() {
  const app = document.querySelector('#app');
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  app.dir = dir;
  document.documentElement.dir = dir;
  document.documentElement.lang = state.lang;

  if (state.user && !state.subscription) {
    app.innerHTML = '<section class="login-container"><div class="login-card">جارٍ التحقق من حالة الاشتراك…</div></section>';
    return;
  }
  
  // إذا انتهى الاشتراك
  if (!isSubscribed()) {
    if (!state.user) {
      app.innerHTML = loginScreen();
      const form = document.querySelector('#login-form');
      if (form) {
        form.removeEventListener('submit', handleLoginSubmit);
        form.addEventListener('submit', handleLoginSubmit);
      }
      return;
    }
    
    if (state.user.role === 'manager') {
      app.innerHTML = subscriptionScreenManager();
      const form = document.querySelector('#subscription-form');
      if (form) {
        form.removeEventListener('submit', handleSubscriptionSubmit);
        form.addEventListener('submit', handleSubscriptionSubmit);
      }
      return;
    }
    
    app.innerHTML = subscriptionWarningScreen();
    return;
  }
  
  // SPEC 002 — شاشة طلب اشتراك جديد (قبل التحقق من الاشتراك)
  if (state.showNewSub && !state.user) {
    app.innerHTML = newSubscriptionScreen(state.showNewSub === 'done');
    const form = document.querySelector('#new-sub-form');
    if (form) {
      form.removeEventListener('submit', handleNewSubscriptionSubmit);
      form.addEventListener('submit', handleNewSubscriptionSubmit);
    }
    return;
  }

  if (!state.user) {
    app.innerHTML = loginScreen();
    const form = document.querySelector('#login-form');
    if (form) {
      form.removeEventListener('submit', handleLoginSubmit);
      form.addEventListener('submit', handleLoginSubmit);
    }
    return;
  }
  
  app.innerHTML = state.mode ? workspace() : home();
  
  // Attach settings form submission handler if on settings screen
  if (state.mode && state.screen === 'settings') {
    const settingsForm = document.querySelector('#store-settings-form');
    if (settingsForm) {
      settingsForm.removeEventListener('submit', handleSettingsSubmit);
      settingsForm.addEventListener('submit', handleSettingsSubmit);
      
      const updatePreview = () => {
        const nameInput = settingsForm.querySelector('[name="name"]').value;
        const phoneInput = settingsForm.querySelector('[name="phone"]').value;
        const addressInput = settingsForm.querySelector('[name="address"]').value;
        const footerInput = settingsForm.querySelector('[name="footer"]').value;
        
        const showLogo = settingsForm.querySelector('[name="showLogo"]').checked;
        const showPhone = settingsForm.querySelector('[name="showPhone"]').checked;
        const showAddress = settingsForm.querySelector('[name="showAddress"]').checked;
        const showFooter = settingsForm.querySelector('[name="showFooter"]').checked;
        
        const previewName = document.getElementById('preview-name');
        const previewPhone = document.getElementById('preview-phone');
        const previewAddress = document.getElementById('preview-address');
        const previewFooter = document.getElementById('preview-footer');
        const previewLogo = document.getElementById('preview-logo');
        
        if (previewName) previewName.textContent = nameInput;
        if (previewPhone) {
          previewPhone.textContent = phoneInput ? '📞 ' + phoneInput : '';
          previewPhone.style.display = showPhone ? 'block' : 'none';
        }
        if (previewAddress) {
          previewAddress.textContent = addressInput ? '📍 ' + addressInput : '';
          previewAddress.style.display = showAddress ? 'block' : 'none';
        }
        if (previewFooter) {
          previewFooter.textContent = footerInput;
          previewFooter.style.display = (showFooter && footerInput) ? 'block' : 'none';
        }
        if (previewLogo) {
          previewLogo.style.display = showLogo ? 'grid' : 'none';
        }
      };
      
      settingsForm.addEventListener('input', updatePreview);
      settingsForm.addEventListener('change', updatePreview);
    }
    const logoInput = document.querySelector('#store-logo-input');
    if (logoInput) logoInput.addEventListener('change', handleLogoUpload);
  }
}

function home() {
  const roleLabels = { manager: t('managerRole'), cashier: t('cashierRole'), storekeeper: t('storekeeperRole') };
  const roleLabel = roleLabels[state.user.role] || state.user.role;
  const subDaysLeft = subscriptionDaysLeft();
  
  return `
    <section class="home">
      <div class="home-user-bar">
        <span class="user-badge" data-action="view-subscription" style="cursor:pointer;">💳 ${t('subActive')} (${subDaysLeft} ${t('daysLeft')})</span>
        <div style="display: flex; gap: 8px; align-items: center;">
          <div class="lang-selector">
            <button type="button" class="lang-btn ${state.lang === 'ar' ? 'active' : ''}" data-action="set-lang" data-lang="ar">AR</button>
            <button type="button" class="lang-btn ${state.lang === 'en' ? 'active' : ''}" data-action="set-lang" data-lang="en">EN</button>
            <button type="button" class="lang-btn ${state.lang === 'fr' ? 'active' : ''}" data-action="set-lang" data-lang="fr">FR</button>
          </div>
          <span class="user-name">👤 ${e(state.user.name)} (${roleLabel})</span>
          <button class="logout-btn" data-action="logout">${t('logoutBtn')}</button>
        </div>
      </div>
      <div class="icon" style="font-size:72px">🏪</div>
      <h1 class="brand">${t('brand')}</h1>
      <p class="sub">${t('subTitle')}</p>
      
      <div class="choice-grid">
        ${state.user?.role === 'super_admin' ? `
        <button class="choice" data-action="choose-admin" style="border-color:var(--purple); background:var(--purple-glow);">
          <div class="icon">🛡️</div>
          <h2>لوحة المشرف العام 👑</h2>
          <p>مراجعة والموافقة على طلبات الاشتراكات الجديدة والتجديدات</p>
        </button>
        ` : ''}
        <button class="choice" data-action="choose" data-mode="restaurant">
          <div class="icon">🍽️</div>
          <h2>${t('restaurantMode')}</h2>
          <p>${t('restaurantDesc')}</p>
        </button>
        <button class="choice" data-action="choose" data-mode="grocery">
          <div class="icon">🏪</div>
          <h2>${t('storeMode')}</h2>
          <p>${t('storeDesc')}</p>
        </button>
        <button class="choice" data-action="choose" data-mode="pharmacy">
          <div class="icon">💊</div>
          <h2>${t('pharmacyMode')}</h2>
          <p>${t('pharmacyDesc')}</p>
        </button>
      </div>
    </section>
  `;
}

function workspace() {
  const title = state.screen === 'admin_requests' ? 'لوحة المشرف العام' : state.mode === 'restaurant' ? t('restaurantMode') : state.mode === 'pharmacy' ? t('pharmacyMode') : t('storeMode');
  checkScreenPermissions();
  
  let tabsHtml = '';
  if (state.user.role === 'super_admin') {
    tabsHtml = `
      <button class="tab ${state.screen==='admin_requests'?'active':''}" data-action="screen" data-screen="admin_requests">🛡️ طلبات الاشتراكات</button>
      <button class="tab ${state.screen==='pos'?'active':''}" data-action="screen" data-screen="pos">${t('pos')}</button>
      <button class="tab ${state.screen==='inventory'?'active':''}" data-action="screen" data-screen="inventory">${t('inventory')}</button>
      <button class="tab ${state.screen==='reports'?'active':''}" data-action="screen" data-screen="reports">${t('reports')}</button>
    `;
  } else if (state.user.role === 'manager') {
    tabsHtml = `
      <button class="tab ${state.screen==='pos'?'active':''}" data-action="screen" data-screen="pos">${t('pos')}${cartCount()?` (${cartCount()})`:''}</button>
      <button class="tab ${state.screen==='inventory'?'active':''}" data-action="screen" data-screen="inventory">${t('inventory')}</button>
      <button class="tab ${state.screen==='reports'?'active':''}" data-action="screen" data-screen="reports">${t('reports')}</button>
      <button class="tab ${state.screen==='settings'?'active':''}" data-action="screen" data-screen="settings">${t('settings')}</button>
      <button class="tab ${state.screen==='staff'?'active':''}" data-action="screen" data-screen="staff" style="position:relative;">${t('staffManagement')}</button>
    `;

  } else if (state.user.role === 'cashier') {
    tabsHtml = `
      <button class="tab ${state.screen==='pos'?'active':''}" data-action="screen" data-screen="pos">${t('pos')}${cartCount()?` (${cartCount()})`:''}</button>
    `;
  } else if (state.user.role === 'storekeeper') {
    tabsHtml = `
      <button class="tab ${state.screen==='inventory'?'active':''}" data-action="screen" data-screen="inventory">${t('inventory')}</button>
    `;
  }
  
  const subDaysLeft = subscriptionDaysLeft();
  const roleLabels = { manager: 'مدير', cashier: 'كاشير', storekeeper: 'مسؤول مخزن', super_admin: 'مشرف عام 👑' };
  const roleLabel = roleLabels[state.user.role] || state.user.role;
  
  return `
    <div class="app">
      <nav class="nav">
        <button class="back" data-action="home">← ${t('home')}</button>
        <strong class="nav-title">
          <span style="font-size:20px">${state.screen==='admin_requests'?'🛡️':state.mode==='restaurant'?'🍽️':state.mode==='pharmacy'?'💊':'🏪'}</span>
          ${title}
        </strong>
        
        <div style="display:flex; gap:8px;">
          ${tabsHtml}
        </div>
        
        <div class="user-info-bar">
          <button class="tab" data-action="set-lang" data-lang="${state.lang === 'ar' ? 'en' : state.lang === 'en' ? 'fr' : 'ar'}" style="padding: 6px 12px; font-size: 11px;">🌐 ${state.lang === 'ar' ? 'EN' : state.lang === 'en' ? 'FR' : 'AR'}</button>
          <span class="user-badge" data-action="view-subscription" style="cursor:pointer;" title="${state.lang === 'ar' ? 'انقر لتفاصيل الاشتراك' : 'Click for subscription details'}">
            💳 ${subDaysLeft} ${t('daysLeft')}
          </span>
          <span class="user-name">👤 ${e(state.user.name)}</span>
          <button class="logout-btn" data-action="logout" title="${t('logoutBtn')}">🚪</button>
        </div>
      </nav>
      <div class="view">${state.screen==='admin_requests'?adminPanelScreen():state.screen==='pos'?pos():state.screen==='inventory'?inventory():state.screen==='reports'?reports():state.screen==='staff'?staffManagement():storeSettings()}</div>
    </div>
  `;
}

// ======================================================
// SPEC 002 — لوحة مسؤول الإدارة لمراجعة الاشتراكات وتصديقها
// ======================================================
function showReceiptImageModal(imgSrc, bankName = '', phone = '') {
  const box = document.createElement('div');
  box.className = 'modal-backdrop';
  box.innerHTML = `
    <div class="modal" style="max-width: 480px; text-align: center;">
      <div class="modal-head">
        <h2>🧾 صورة إثبات الدفع البنكي</h2>
        <button type="button" class="close" data-action="close-modal">×</button>
      </div>
      <div style="margin: 16px 0; background: #0b0f19; border-radius: 12px; padding: 16px; border: 1px solid var(--border);">
        ${imgSrc ? `
          <img src="${e(imgSrc)}" alt="إثبات الدفع" style="max-width: 100%; max-height: 380px; border-radius: 8px; object-fit: contain; border: 1px solid var(--green);">
        ` : `
          <div style="background: linear-gradient(135deg, #064e3b, #047857); padding: 24px 16px; border-radius: 12px; color: #fff; text-align: center;">
            <div style="font-size: 36px; margin-bottom: 8px;">📱 إثبات تحويل Bankily / Sadad</div>
            <h3 style="margin: 0 0 4px; color: #a7f3d0; font-size: 18px;">مبلغ التحويل: 300 أوقية (UM)</h3>
            <div style="margin: 12px 0; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; font-size: 13px; text-align: right; line-height: 1.6;">
              <div>اسم المحِوّل البنكي: <strong style="color:#fde047;">${e(bankName || 'عميل جديد')}</strong></div>
              <div>رقم الهاتف: <strong>${e(phone || '-')}</strong></div>
              <div>رقم التحويل المستلم: <strong style="color:#6ee7b7;">41010021 (واتساب)</strong></div>
            </div>
            <small style="opacity: 0.8; font-size: 11px;">تم الإرسال والمطابقة عبر واتساب 41010021</small>
          </div>
        `}
      </div>
      <button type="button" class="primary" data-action="close-modal" style="width: 100%;">إغلاق المعاينة</button>
    </div>
  `;
  document.body.append(box);
}

function adminPanelScreen() {
  const requests = state.adminRequestsList || [];
  const activeSubs = state.adminActiveSubs || [];
  const statusFilter = state.adminTabStatus || 'active_subs';

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  let contentHtml = '';

  if (statusFilter === 'active_subs') {
    // عرض قائمة العملاء والمحلات المشتركة حاليًا
    contentHtml = activeSubs.length ? activeSubs.map(sub => {
      const daysLeft = sub.expires_at ? Math.max(0, Math.ceil((new Date(sub.expires_at) - Date.now()) / (24 * 60 * 60 * 1000))) : 0;
      return `
        <div class="tr" style="padding:14px 0; border-bottom:1px solid var(--border); align-items:center;">
          <div style="flex:1.5;">
            <strong style="font-size:15px; color:var(--text);">${e(sub.business_name)}</strong>
            <div style="font-size:11px; color:var(--muted); margin-top:2px;">📞 ${e(sub.business_phone || '-')}</div>
          </div>
          <div style="flex:1.5; font-size:13px;">
            <div>👤 ${e(sub.manager_name || 'مدير المحل')}</div>
            <div style="font-size:11px; color:var(--primary);">@${e(sub.manager_username || '-')}</div>
          </div>
          <div style="flex:1; font-size:12px;">
            <span class="stock" style="background:var(--primary-glow); color:var(--primary);">👥 ${sub.staff_count || 0} موظف</span>
          </div>
          <div style="flex:1.2; font-size:12px; color:var(--muted);">
            <div>${new Date(sub.expires_at).toLocaleDateString(state.lang === 'ar' ? 'ar-MR' : 'en-US')}</div>
            <small style="color:var(--gold);">${daysLeft} يوم متبقٍ</small>
          </div>
          <div style="flex:1;">
            <span class="stock" style="color:var(--green); background:var(--green-glow); font-weight:bold;">🟢 اشتراك نشط</span>
          </div>
        </div>
      `;
    }).join('') : `<div class="empty" style="grid-column:1/-1; padding:40px;"><div class="large">🏪</div>لا يوجد عملاء مشتركون حاليًا</div>`;
  } else {
    // عرض قائمة طلبات الدفع والاشتراكات المقبولة/المرفوضة/المعلقة
    contentHtml = requests.length ? requests.map(req => {
      const isNewSub = req.request_type === 'new_subscription';
      const typeBadge = isNewSub
        ? `<span class="stock" style="background:var(--purple-glow); color:var(--purple); border:1px solid var(--purple);">🏪 اشتراك جديد</span>`
        : `<span class="stock" style="background:var(--primary-glow); color:var(--primary);">🔄 تجديد</span>`;

      const statusBadge = req.status === 'approved'
        ? `<span class="stock" style="color:var(--green); background:var(--green-glow);">🟢 تصديق ومقبول</span>`
        : req.status === 'rejected'
        ? `<span class="stock" style="color:var(--red); background:var(--red-glow);">🔴 مرفوض</span>`
        : `<span class="stock" style="color:var(--gold); background:var(--gold-glow);">⏳ قيد المراجعة</span>`;

      const detailsText = isNewSub
        ? `<div><strong>الاسم البنكي:</strong> ${e(req.bank_name || '-')}</div>
           <div><strong>رقم الهاتف:</strong> ${e(req.payer_phone || '-')}</div>
           <div><strong>اسم المحل:</strong> ${e(req.business_name || req.bank_name || '-')}</div>
           <div><strong>اسم المستخدم المطلوبة:</strong> <code>@${e(req.requested_username || '-')}</code></div>`
        : `<div><strong>المحل:</strong> ${e(req.business_name || '-')}</div>
           <div><strong>المُقدِّم:</strong> ${e(req.submitted_by_name || '-')} (@${e(req.submitted_by_username || '-')})</div>
           <div><strong>رقم العملية:</strong> <code>${e(req.transaction_id || '-')}</code></div>
           <div><strong>رقم الهاتف:</strong> ${e(req.payer_phone || req.business_phone || '-')}</div>`;

      return `
        <div class="tr" style="padding:16px 0; border-bottom:1px solid var(--border);">
          <div style="flex:0.8;">${typeBadge}</div>
          <div style="flex:2; font-size:13px; line-height:1.5;">
            ${detailsText}
            <div style="margin-top:6px;">
              <button type="button" class="tiny ghost" data-action="view-receipt-img" data-img="${e(req.receipt_image || '')}" data-bank="${e(req.bank_name || req.business_name || '')}" data-phone="${e(req.payer_phone || req.business_phone || '')}">
                📷 معاينة إثبات الدفع (واتساب 41010021)
              </button>
            </div>
          </div>
          <div style="flex:1; font-size:12px; color:var(--muted);">${new Date(req.created_at).toLocaleString(state.lang === 'ar' ? 'ar-MR' : 'en-US')}</div>
          <div style="flex:0.8;">${statusBadge}</div>
          <div class="actions" style="flex:1.4;">
            ${req.status === 'pending' ? `
              <button class="tiny add" data-action="approve-admin-req" data-reqid="${e(req.id)}" style="background:var(--green-gradient); color:#000; padding:8px 14px; font-weight:800;">✅ تصديق وتفعيل الاشتراك فوراً</button>
              <button class="tiny delete" data-action="reject-admin-req" data-reqid="${e(req.id)}" style="padding:8px 12px;">❌ رفض</button>
            ` : `<span style="font-size:11px; color:var(--muted);">${req.reject_reason ? `السبب: ${e(req.reject_reason)}` : 'مكتمل ومصدق'}</span>`}
          </div>
        </div>
      `;
    }).join('') : `<div class="empty" style="grid-column:1/-1; padding:40px;"><div class="large">📋</div>لا توجد طلبات ${statusFilter === 'pending' ? 'قيد المراجعة' : 'بهذه الحالة'}</div>`;
  }

  return `
    <section class="page animate-fade-in" style="max-width:1100px; margin:0 auto; padding:20px;">
      <div class="page-head">
        <div>
          <h1>🛡️ لوحة مسؤول الإدارة — تصديق ومتابعة الاشتراكات</h1>
          <p>عرض العملاء المشتركين حاليًا ومراجعة طلبات الدفع وإثباتات التحويل البنكي وتصديقها فورًا</p>
        </div>
        <button class="ghost" data-action="refresh-admin-reqs">🔄 تحديث البيانات</button>
      </div>

      <div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap;">
        <button class="tab ${statusFilter === 'active_subs' ? 'active' : ''}" data-action="set-admin-tab" data-tab="active_subs">
          👥 العملاء المشتركون حالياً (${activeSubs.length})
        </button>
        <button class="tab ${statusFilter === 'pending' ? 'active' : ''}" data-action="set-admin-tab" data-tab="pending">
          ⏳ طلبات قيد المراجعة ${pendingCount ? `(${pendingCount})` : ''}
        </button>
        <button class="tab ${statusFilter === 'approved' ? 'active' : ''}" data-action="set-admin-tab" data-tab="approved">
          ✅ الطلبات المقبولة
        </button>
        <button class="tab ${statusFilter === 'rejected' ? 'active' : ''}" data-action="set-admin-tab" data-tab="rejected">
          🔴 الطلبات المرفوضة
        </button>
      </div>

      <div class="table">
        ${statusFilter === 'active_subs' ? `
          <div class="tr th">
            <div style="flex:1.5;">اسم المحل / المتجر</div>
            <div style="flex:1.5;">المدير العام (المستثمر)</div>
            <div style="flex:1;">الطاقم</div>
            <div style="flex:1.2;">تاريخ انتهاء الاشتراك</div>
            <div style="flex:1;">حالة الاشتراك</div>
          </div>
        ` : `
          <div class="tr th">
            <div style="flex:0.8;">النوع</div>
            <div style="flex:2;">البيانات التفصيلية وإثبات الدفع</div>
            <div style="flex:1;">تاريخ الطلب</div>
            <div style="flex:0.8;">الحالة</div>
            <div style="flex:1.4;">الإجراءات</div>
          </div>
        `}
        ${contentHtml}
      </div>
    </section>
  `;
}

async function loadAdminRequests() {
  if (!state.user || state.user.role !== 'super_admin') return;
  try {
    const status = state.adminTabStatus || 'active_subs';
    if (status === 'active_subs') {
      const activeRes = await apiRequest('/admin/active-subscriptions');
      state.adminActiveSubs = activeRes.subscriptions || [];
    } else {
      const result = await apiRequest(`/admin/payment-requests?status=${status}`);
      state.adminRequestsList = result.requests || [];
    }
    render();
  } catch (error) {
    toast(error.message || 'تعذّر تحميل بيانات مسؤول الإدارة', 'error');
    render();
  }
}

// ======================================================
// SPEC 002 — إدارة الطاقم
// ======================================================
function staffManagement() {
  const staff = state.staffList || [];
  const roleLabels = { cashier: t('cashierRoleLabel'), storekeeper: t('storekeeperRoleLabel') };
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';

  const rowsHtml = staff.length ? staff.map(emp => {
    const isActive = emp.is_active !== false;
    const roleText = roleLabels[emp.role] || emp.role;
    return `
      <div class="tr" style="${!isActive ? 'opacity:0.6;' : ''}">
        <div class="product-label">
          <span style="font-size:24px">${isActive ? '👤' : '🚫'}</span>
          <span>${e(emp.name)}</span>
        </div>
        <div>${e(emp.username)}</div>
        <div><span class="stock" style="background:var(--primary-glow); color:var(--primary);">${e(roleText)}</span></div>
        <div>
          <span class="stock ${isActive ? '' : 'low'}" style="${isActive ? 'color:var(--green);background:var(--green-glow);' : 'color:var(--red);background:var(--red-glow);'}">
            ${isActive ? t('staffActive') : t('staffDisabled')}
          </span>
        </div>
        <div class="actions">
          <button class="tiny edit" data-action="edit-staff" data-staffid="${e(emp.id)}">✏️ ${t('editBtn')}</button>
          <button class="tiny ${isActive ? 'delete' : 'add'}" data-action="toggle-staff" data-staffid="${e(emp.id)}" data-active="${isActive}">
            ${isActive ? t('disableStaffBtn') : t('enableStaffBtn')}
          </button>
        </div>
      </div>
    `;
  }).join('') : `<div class="empty" style="grid-column:1/-1; padding:40px;"><div class="large">👤</div>${t('noStaffYet')}</div>`;

  return `
    <section class="page animate-fade-in">
      <div class="page-head">
        <div>
          <h1>${t('staffManagement')}</h1>
          <p>${t('staffManagementDesc')}</p>
        </div>
        <button class="add" data-action="new-staff">${t('addStaffBtn')}</button>
      </div>

      <div class="table">
        <div class="tr th">
          <div>${t('staffNameCol')}</div>
          <div>${t('staffUsernameCol')}</div>
          <div>${t('staffRoleCol')}</div>
          <div>${t('staffStatusCol')}</div>
          <div>${t('staffActionsCol')}</div>
        </div>
        ${rowsHtml}
      </div>
    </section>
  `;
}

async function loadStaff() {
  try {
    const result = await apiRequest('/staff');
    state.staffList = result.staff || result || [];
    render();
  } catch (error) {
    toast(t('staffLoadError'), 'error');
    state.staffList = [];
    render();
  }
}

function showStaffModal(emp = null) {
  const box = document.createElement('div');
  box.className = 'modal-backdrop';
  const isEdit = !!emp;
  const dir = state.lang === 'ar' ? 'rtl' : 'ltr';

  box.innerHTML = `
    <form class="modal" id="staff-form" style="width: min(480px, 100%); direction: ${dir};">
      <div class="modal-head">
        <h2>${isEdit ? t('editStaffTitle') : t('addStaffTitle')}</h2>
        <button type="button" class="close" data-action="close-modal">×</button>
      </div>

      <input type="hidden" name="staffId" value="${e(emp?.id || '')}">

      <div style="display:flex; flex-direction:column; gap:14px; padding: 4px 0;">
        <div class="field">
          <label>${t('staffNameLabel')}</label>
          <input required type="text" name="staff_name" value="${e(emp?.name || '')}" placeholder="${t('staffNamePlaceholder')}">
        </div>

        <div class="field">
          <label>${t('staffUsernameLabel')}</label>
          <input required type="text" name="staff_username" value="${e(emp?.username || '')}" placeholder="${t('staffUsernamePlaceholder')}" dir="ltr" autocomplete="off">
        </div>

        <div class="field">
          <label>${isEdit ? t('newPasswordLabel') : t('staffPasswordLabel')}</label>
          <input ${isEdit ? '' : 'required'} type="password" name="staff_password" placeholder="${isEdit ? t('newPasswordPlaceholder') : t('staffPasswordPlaceholder')}" autocomplete="new-password" minlength="${isEdit ? '0' : '4'}">
          ${isEdit ? `<small style="color:var(--muted); font-size:11px; margin-top:4px; display:block;">${t('staffPasswordEditNote')}</small>` : ''}
        </div>

        <div class="field">
          <label>${t('staffRoleLabel')}</label>
          <select name="staff_role">
            <option value="cashier" ${(!isEdit || emp?.role === 'cashier') ? 'selected' : ''}>${t('cashierRoleOpt')}</option>
            <option value="storekeeper" ${(isEdit && emp?.role === 'storekeeper') ? 'selected' : ''}>${t('storekeeperRoleOpt')}</option>
          </select>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:16px;">
        <button class="primary" type="submit">${t('saveStaffBtn')}</button>
        <button type="button" class="ghost" data-action="close-modal">${t('cancelBtnLabel')}</button>
      </div>
    </form>
  `;
  document.body.append(box);

  const form = box.querySelector('#staff-form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const vals = Object.fromEntries(new FormData(form));
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;

    const body = {
      name: vals.staff_name.trim(),
      username: vals.staff_username.trim(),
      role: vals.staff_role
    };
    if (vals.staff_password) body.password = vals.staff_password;

    try {
      if (isEdit) {
        await apiRequest(`/staff/${vals.staffId}`, { method: 'PATCH', body: JSON.stringify(body) });
        toast(t('staffUpdatedToast'));
      } else {
        if (!body.password) { toast(t('staffSaveError'), 'error'); submitBtn.disabled = false; return; }
        await apiRequest('/staff', { method: 'POST', body: JSON.stringify(body) });
        toast(t('staffCreatedToast'));
      }
      box.remove();
      await loadStaff();
    } catch (error) {
      toast(error.message || t('staffSaveError'), 'error');
      submitBtn.disabled = false;
    }
  });
}

function pos(){

  const data=cur();
  const filtered=data.products.filter(p=>(state.category==='الكل'||p.category===state.category)&&(!state.query||p.name.toLowerCase().includes(state.query.toLowerCase())||(p.barcode||'').includes(state.query)));
  const isBarcodeMode = usesInventory();
  
  return `<div class="pos">
    <section class="catalog">
      <div class="toolbar">
        <input aria-label="search" data-input="query" value="${e(state.query)}" placeholder="${t('searchPlaceholder')}" />
        ${isBarcodeMode ? `<input class="barcode" data-input="barcode" placeholder="${t('scanPlaceholder')}" />` : ''}
      </div>
      <div class="cats">
        <button class="cat ${state.category==='الكل'?'active':''}" data-action="category" data-category="الكل">${t('all')}</button>
        ${data.categories.map(c=>`<button class="cat ${state.category===c?'active':''}" data-action="category" data-category="${e(c)}">${t(c)}</button>`).join('')}
      </div>
      <div class="products">
        ${filtered.length?filtered.map(productCard).join(''):`<div class="empty" style="grid-column:1/-1"><div class="large">🔍</div>${state.lang==='ar'?'لا توجد منتجات مطابقة':'No matching products'}</div>`}
      </div>
    </section>
    ${cart()}
  </div>`
}
function productCard(p){
  const isStockMode = usesInventory();
  const currency = t('currency');
  
  if (p.isWeightBased) {
    const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
    const sold = isStockMode && totalStock === 0;
    const prices = p.variants.map(v => v.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceText = minPrice === maxPrice ? `${money(minPrice)}` : `${money(minPrice)} - ${money(maxPrice)}`;
    
    return `<button class="product" ${sold?'disabled':''} data-action="add" data-id="${p.id}">
      <span class="emoji">${p.emoji}</span>
      <div class="name">${e(p.name)}</div>
      <div class="price">${priceText} ${currency}</div>
      <span class="stock" style="color:var(--primary); background:var(--primary-glow)">${state.lang==='ar'?'أوزان متعددة':'Multi Weights'}</span>
      ${sold?`<div class="sold">${state.lang==='ar'?'نفد المخزون':'Out of Stock'}</div>`:''}
    </button>`;
  }
  
  const sold = isStockMode && p.stock===0;
  return `<button class="product" ${sold?'disabled':''} data-action="add" data-id="${p.id}">
    <span class="emoji">${p.emoji}</span>
    <div class="name">${e(p.name)}</div>
    <div class="price">${money(p.price)} ${currency}</div>
    ${isStockMode?`<span class="stock ${p.stock<10?'low':''}">${p.stock<10?'⚠️ ':''}${state.lang==='ar'?'المخزون':'Stock'}: ${p.stock}</span>`:''}
    ${sold?`<div class="sold">${state.lang==='ar'?'نفد المخزون':'Out of Stock'}</div>`:''}
  </button>`
}
function cart(){
  const currency = t('currency');
  return `<aside class="cart">
    <div class="cart-head">
      <div>
        <span class="cart-title">${t('currentOrder')}</span>
        ${cartCount()?` <span class="badge">${cartCount()}</span>`:''}
      </div>
      ${state.cart.length?`<button class="danger" data-action="clear-cart">${t('clearCart')}</button>`:''}
    </div>
    <div class="cart-items">
      ${state.cart.length?state.cart.map(item=>`
        <div class="cart-item">
          <span style="font-size:27px">${item.emoji}</span>
          <div class="item-info">
            <div class="item-name">${e(item.name)}</div>
            <div class="price">${money(item.price*item.qty)} ${currency}</div>
          </div>
          <div class="qty">
            <button data-action="qty" data-cartid="${item.cartId}" data-delta="-1">−</button>
            <span>${item.qty}</span>
            <button data-action="qty" data-cartid="${item.cartId}" data-delta="1">+</button>
          </div>
          <button class="remove" aria-label="Remove" data-action="remove" data-cartid="${item.cartId}">×</button>
        </div>`).join('')
      :`<div class="empty"><div class="large">🛒</div><strong>${t('emptyCart')}</strong><span>${t('clickProduct')}</span></div>`}
    </div>
    ${state.cart.length?`
      <div class="checkout">
        <div class="total">
          <span>${t('total')}</span>
          <strong>${money(total())} <small>${currency}</small></strong>
        </div>
        <button class="primary" data-action="checkout">${t('checkoutBtn')}</button>
      </div>`
    :''}
  </aside>`
}
function inventory(){
  const isStockMode = usesInventory();
  const currency = t('currency');
  const headers = [t('productCol'), t('categoryCol'), t('priceCol'), t('stockCol'), t('editStockCol'), t('actionsCol')];
  
  let rowsHtml = cur().products.map(p => {
    if (p.isWeightBased) {
      return p.variants.map((v, idx) => {
        const nameHtml = idx === 0 
          ? `<span style="font-size:26px">${p.emoji}</span><span>${e(p.name)}<br><small class="barcode-label">${state.lang==='ar'?'أوزان متعددة':'Multi Weights'}</small></span>`
          : `<span style="${state.lang==='ar'?'margin-right:24px;':'margin-left:24px;'} color:var(--primary)">┖ ${e(v.name)}</span>`;
          
        return `
          <div class="tr" style="${idx > 0 ? 'background: rgba(255,255,255,0.015);' : ''}">
            <div class="product-label">
              <div>
                ${nameHtml}
                ${v.barcode?`<br><small class="barcode-label">#${e(v.barcode)}</small>`:''}
              </div>
            </div>
            <div class="category-label"><span>${t(p.category)}</span></div>
            <div class="price">${money(v.price)} ${currency}</div>
            <div>
              ${isStockMode ? `<span class="stock ${v.stock<10?'low':''}">${v.stock}</span>` : '—'}
            </div>
            <div>
              ${isStockMode ? `
                <div class="edit-stock">
                  <button class="tiny minus" data-action="variant-stock" data-pid="${p.id}" data-vid="${v.id}" data-delta="-1">−1</button>
                  <button class="tiny plus" data-action="variant-stock" data-pid="${p.id}" data-vid="${v.id}" data-delta="10">+10</button>
                </div>
              ` : '—'}
            </div>
            <div class="actions">
              ${idx === 0 ? `
                <button class="tiny edit" data-action="edit-product" data-id="${p.id}">✏️ ${t('editBtn')}</button>
                <button class="tiny delete" data-action="delete-product" data-id="${p.id}">🗑️</button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    } else {
      return `
        <div class="tr">
          <div class="product-label">
            <span style="font-size:26px">${p.emoji}</span>
            <span>${e(p.name)}${p.barcode?`<br><small class="barcode-label">#${e(p.barcode)}</small>`:''}</span>
          </div>
          <div class="category-label"><span>${t(p.category)}</span></div>
          <div class="price">${money(p.price)} ${currency}</div>
          <div>
            ${isStockMode ? `<span class="stock ${p.stock<10?'low':''}">${p.stock}</span>` : '—'}
          </div>
          <div>
            ${isStockMode ? `
              <div class="edit-stock">
                <button class="tiny minus" data-action="stock" data-id="${p.id}" data-delta="-1">−1</button>
                <button class="tiny plus" data-action="stock" data-id="${p.id}" data-delta="10">+10</button>
              </div>
            ` : '—'}
          </div>
          <div class="actions">
            <button class="tiny edit" data-action="edit-product" data-id="${p.id}">✏️ ${t('editBtn')}</button>
            <button class="tiny delete" data-action="delete-product" data-id="${p.id}">🗑️</button>
          </div>
        </div>
      `;
    }
  }).join('');
  
  return `<section class="page">
    <div class="page-head">
      <div>
        <h1>📦 ${state.lang==='ar'?'إدارة المخزون والمنتجات':'Inventory & Products'}</h1>
        <p>${cur().products.length} ${state.lang==='ar'?'منتج مسجل':'registered products'}</p>
      </div>
      <button class="add" data-action="new-product">${t('addProduct')}</button>
    </div>
    <div class="table">
      <div class="tr th">${headers.map(h=>`<div>${h}</div>`).join('')}</div>
      ${rowsHtml}
    </div>
  </section>`
}
function reports(){
  const today = new Date().toDateString();
  const todays = state.orders.filter(o => new Date(o.date).toDateString() === today);
  const todayRevenue = todays.reduce((sum,o) => sum+o.total, 0);
  const revenue = state.orders.reduce((sum,o) => sum+o.total, 0);

  // إحصاءات حركة المخزن اليوم
  const todayInv = state.invLog.filter(l => new Date(l.date).toDateString() === today);
  const todayStockIn = todayInv.filter(l => l.type === 'stock_in').reduce((s,l) => s + (l.qty||0), 0);
  const totalStockIn = state.invLog.filter(l => l.type === 'stock_in').reduce((s,l) => s + (l.qty||0), 0);
  const totalNewProducts = state.invLog.filter(l => l.type === 'add_product').length;

  // بناء صفوف سجل حركة المخزن
  const typeIcon = { add_product:'➕', edit_product:'✏️', stock_in:'⬆️', stock_out:'⬇️' };
  const typeLabel = { 
    add_product: state.lang === 'ar' ? 'منتج جديد' : 'New Product', 
    edit_product: state.lang === 'ar' ? 'تعديل منتج' : 'Edit Product', 
    stock_in: state.lang === 'ar' ? 'إضافة مخزون' : 'Stock In', 
    stock_out: state.lang === 'ar' ? 'سحب مخزون' : 'Stock Out' 
  };
  const typeColor = { add_product:'var(--green)', edit_product:'var(--primary)', stock_in:'var(--green)', stock_out:'var(--red)' };
  const typeBg = { add_product:'var(--green-glow)', edit_product:'var(--primary-glow)', stock_in:'var(--green-glow)', stock_out:'var(--red-glow)' };

  const invRowsHtml = state.invLog.slice(0, 50).map(l => {
    let modeText = '';
    if (l.mode === 'restaurant') modeText = state.lang === 'ar' ? '🍽️ مطعم' : '🍽️ Restaurant';
    else if (l.mode === 'grocery') modeText = state.lang === 'ar' ? '🛒 بقالة' : '🛒 Grocery';
    else modeText = state.lang === 'ar' ? '💊 صيدلية' : '💊 Pharmacy';

    return `
      <div class="inv-log-row">
        <div class="inv-log-icon" style="background:${typeBg[l.type]}; color:${typeColor[l.type]};">${typeIcon[l.type] || '📦'}</div>
        <div class="inv-log-info">
          <div class="inv-log-name">${e(l.emoji)} ${e(l.productName)}${l.variant ? ` <span class="inv-variant">(${e(l.variant)})</span>` : ''}</div>
          <div class="inv-log-meta">
            <span class="inv-log-type" style="background:${typeBg[l.type]}; color:${typeColor[l.type]};">${typeLabel[l.type] || l.type}</span>
            ${l.qty !== null && l.qty !== undefined ? `<span class="inv-log-qty">${l.qty > 0 ? '+' : ''}${l.qty} ${state.lang==='ar'?'وحدة':'units'}</span>` : ''}
            <span class="inv-log-user">👤 ${e(l.user)}</span>
            <span class="inv-log-mode">${modeText}</span>
          </div>
        </div>
        <div class="inv-log-date">${new Date(l.date).toLocaleString(state.lang === 'ar' ? 'ar-MR' : 'en-US')}</div>
      </div>
    `;
  }).join('');

  return `<section class="page">
    <div class="page-head">
      <div>
        <h1>${t('reportsTitle')}</h1>
        <p>${t('reportsDesc')}</p>
      </div>
      ${state.orders.length ? `<button class="danger" data-action="clear-orders">${t('clearOrders')}</button>` : ''}
    </div>

    <!-- إحصائيات المبيعات -->
    <div class="reports-section-title">📈 ${state.lang==='ar'?'إحصائيات المبيعات':'Sales Statistics'}</div>
    <div class="stats">
      <div class="stat"><div class="stat-icon">🧾</div><strong>${todays.length}</strong><span>${t('todayOrders')}</span></div>
      <div class="stat"><div class="stat-icon">💰</div><strong>${money(todayRevenue)} ${t('currency')}</strong><span>${t('todayRevenue')}</span></div>
      <div class="stat"><div class="stat-icon">📦</div><strong>${state.orders.length}</strong><span>${t('totalOrders')}</span></div>
      <div class="stat"><div class="stat-icon">💵</div><strong>${money(revenue)} ${t('currency')}</strong><span>${t('totalRevenue')}</span></div>
    </div>

    <!-- إحصائيات حركة المخزون -->
    <div class="reports-section-title">📦 ${state.lang==='ar'?'إحصائيات حركة المخزون':'Stock Statistics'}</div>
    <div class="stats">
      <div class="stat"><div class="stat-icon">⬆️</div><strong style="color:var(--green)">${todayStockIn}</strong><span>${state.lang==='ar'?'وحدة مضافة اليوم':'units added today'}</span></div>
      <div class="stat"><div class="stat-icon">🗃️</div><strong style="color:var(--green)">${totalStockIn}</strong><span>${state.lang==='ar'?'إجمالي الوحدات المضافة':'total units added'}</span></div>
      <div class="stat"><div class="stat-icon">➕</div><strong style="color:var(--primary)">${totalNewProducts}</strong><span>${state.lang==='ar'?'منتجات مضافة':'products added'}</span></div>
      <div class="stat"><div class="stat-icon">📝</div><strong style="color:var(--purple)">${state.invLog.length}</strong><span>${state.lang==='ar'?'إجمالي حركات المخزون':'total movements'}</span></div>
    </div>

    <!-- آخر الطلبات -->
    <div class="page-head" style="margin-top:10px"><h1 style="font-size:16px">${t('lastOrders')}</h1></div>
    ${state.orders.length ? `<div class="orders">${state.orders.slice(0,20).map(o=>{
      let orderModeIcon = '💊';
      if (o.mode === 'restaurant') orderModeIcon = '🍽️';
      else if (o.mode === 'grocery') orderModeIcon = '🛒';
      return `
        <div class="order" style="cursor:pointer;" data-action="view-receipt" data-orderid="${o.id}">
          <div class="order-icon">${orderModeIcon}</div>
          <div class="order-info">
            <div class="order-items">${o.items.map(i=>`${i.emoji} ${e(i.name)} x${i.qty}`).join(' | ')}</div>
            <div class="order-date">${new Date(o.date).toLocaleString(state.lang === 'ar' ? 'ar-MR' : 'en-US')}</div>
          </div>
          <div class="order-total">${money(o.total)} ${t('currency')}</div>
        </div>`;
    }).join('')}</div>`
    : `<div class="empty"><div class="large">📋</div>${state.lang==='ar'?'لا توجد طلبات بعد':'No orders yet'}</div>`}

    <!-- سجل حركة المخزون -->
    <div class="page-head" style="margin-top:24px;">
      <h1 style="font-size:16px">${t('stockLog')}</h1>
      ${state.invLog.length ? `<button class="danger" data-action="clear-invlog">${t('clearLog')}</button>` : ''}
    </div>
    ${state.invLog.length
      ? `<div class="inv-log">${invRowsHtml}</div>`
      : `<div class="empty"><div class="large">📦</div>${state.lang==='ar'?'لا توجد حركات مخزون مسجلة بعد':'No stock movements recorded yet'}</div>`}
  </section>`;
}
function showQuickWeightModal(product) {
  const box = document.createElement('div');
  box.className = 'modal-backdrop';
  
  const title = `اختر الوزن لـ ${product.name}`;
  
  let optionsHtml = product.variants.map(v => {
    const isOut = usesInventory() && v.stock <= 0;
    const stockText = usesInventory() ? ` (المخزون: ${v.stock})` : '';
    return `
      <button type="button" class="weight-option-btn" ${isOut ? 'disabled' : ''} data-action="select-weight" data-pid="${product.id}" data-vid="${v.id}">
        <span>⚖️ ${e(v.name)} ${stockText}</span>
        <strong>${money(v.price)} ${CURRENCY}</strong>
      </button>
    `;
  }).join('');
  
  box.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <h2>${e(title)}</h2>
        <button type="button" class="close" data-action="close-modal">×</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${optionsHtml}
      </div>
    </div>
  `;
  document.body.append(box);
}
function modal(product=null){
  const categories = cur().categories;
  const grocery = usesInventory();
  
  const fresh = product || {
    name: '',
    price: '',
    stock: state.mode==='restaurant' ? 999 : '',
    category: categories[0],
    barcode: '',
    emoji: '📦',
    isWeightBased: false,
    variants: []
  };
  
  const emojiCategories = {
    fruits: { label: 'خضار وفواكه', list: ['🍎','🍏','🍊','🍋','🍌','🍉','🍇','🍓','🫒','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧅','🥔','🍠','🍍','🥭','🥥','🥝','🍒','🍑'] },
    meals: { label: 'مأكولات', list: ['🍞','🥖','🥐','🍳','🥩','🍗','🍖','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🥙','🧆','🥘','🍲','🥗','🍿','🍱','🥟','🍤','🐟','🦀','🦞','🐙'] },
    sweets: { label: 'حلويات', list: ['🎂','🍰','🧁','🥧','🍩','🍪','🍫','🍬','🍭','🍮','🍯','🍨','🍦','🥜','🫘'] },
    drinks: { label: 'مشروبات', list: ['💧','🥛','🥤','🧃','☕','🫖','🍵','🍶','🧋','🍾'] },
    cleaning: { label: 'منظفات', list: ['🧼','🧽','🧴','🧹','🧺','🧻','🗑️','🕯️'] },
    pharmacy: { label: 'أدوية', list: ['💊','💉','🩹','🩺','🧪','😷','🧴','🧼','🩻','🦷','👓','🦼','🩼','🩸','🫁','🧬','🧫','🍼'] },
    books: { label: 'كتب', list: ['📚','📖','📕','📗','📘','📙','📒','📓','📝','✏️','🖊️','🖍️','🖇️','📎','📐','🎒','🔖','🗂️'] },
    electronics: { label: 'إلكترونيات', list: ['📱','💻','⌨️','🖥️','🖨️','🖱️','🎧','🎮','📷','📺','⌚','🔋','🔌','💡','🔦','📡','🎙️','📀'] },
    clothing: { label: 'ملابس', list: ['👕','👔','👗','👚','🧥','🥼','🦺','👖','🩳','👟','👞','👠','🥾','🧢','🎩','🧤','🧣','👜'] },
    general: { label: 'عام', list: ['📦','🛍️','🏷️','🎁','🛒','🍽️','🏪','💰','🧾','🪑','🔧','🧸'] }
  };
  
  const tabButtons = Object.keys(emojiCategories).map(cat => {
    const active = cat === currentEmojiCategory ? 'active' : '';
    return `<button type="button" class="emoji-tab-btn ${active}" data-action="emoji-tab" data-cat="${cat}">${emojiCategories[cat].label}</button>`;
  }).join('');
  
  const emojiListHtml = emojiCategories[currentEmojiCategory].list.map(x => {
    const selected = fresh.emoji === x ? 'selected' : '';
    return `<button type="button" class="${selected}" data-action="emoji" data-emoji="${x}">${x}</button>`;
  }).join('');
  
  let variantsHtml = '';
  if (fresh.variants && fresh.variants.length > 0) {
    variantsHtml = fresh.variants.map((v, idx) => `
      <div class="variant-row" data-index="${idx}">
        <input required placeholder="الوزن (مثال: 1كغ)" name="v_name_${idx}" value="${e(v.name)}">
        <input required min="0" type="number" placeholder="السعر" name="v_price_${idx}" value="${e(v.price)}">
        ${grocery ? `<input required min="0" type="number" placeholder="المخزون" name="v_stock_${idx}" value="${e(v.stock)}">` : `<input type="hidden" name="v_stock_${idx}" value="999">`}
        <input placeholder="الباركود" name="v_barcode_${idx}" value="${e(v.barcode || '')}">
        <button type="button" class="tiny delete" style="padding:10px" data-action="remove-variant-row" data-index="${idx}">×</button>
      </div>
    `).join('');
  }
  
  const box=document.createElement('div');
  box.className='modal-backdrop';
  box.innerHTML=`
    <form class="modal" id="product-form" style="width: min(600px, 100%)">
      <div class="modal-head">
        <h2>${product?'✏️ تعديل المنتج':'➕ إضافة منتج جديد'}</h2>
        <button type="button" class="close" data-action="close-modal">×</button>
      </div>
      <input type="hidden" name="id" value="${e(fresh.id||'')}">
      <input type="hidden" name="emoji" value="${e(fresh.emoji)}">
      
      <div class="field">
        <label>الأيقونة</label>
        <div class="emoji-tabs">
          ${tabButtons}
        </div>
        <div class="emoji-grid" id="emoji-picker-grid">
          ${emojiListHtml}
        </div>
      </div>
      
      <div class="field">
        <label>اسم المنتج *</label>
        <input required name="name" value="${e(fresh.name)}" placeholder="مثال: أرز بسمتي">
      </div>
      
      <div class="field">
        <label>الفئة *</label>
        <select name="category">${categories.map(c=>`<option ${fresh.category===c?'selected':''}>${e(c)}</option>`).join('')}</select>
      </div>
      
      <div class="field" style="display:flex; align-items:center; gap:8px; margin: 20px 0;">
        <input type="checkbox" name="isWeightBased" id="isWeightBased" style="width:auto; margin:0;" ${fresh.isWeightBased ? 'checked' : ''} data-action="toggle-weight-based">
        <label for="isWeightBased" style="margin:0; font-size:13px; color:var(--text); cursor:pointer">بيع بالوزن (يحتوي على أوزان وأسعار متعددة)</label>
      </div>
      
      <div id="standard-pricing-section" style="${fresh.isWeightBased ? 'display:none;' : ''}">
        <div class="field">
          <label>السعر (${CURRENCY}) *</label>
          <input ${fresh.isWeightBased ? '' : 'required'} min="0" type="number" name="price" value="${e(fresh.price)}">
        </div>
        ${grocery ? `
          <div class="field">
            <label>الكمية في المخزون *</label>
            <input ${fresh.isWeightBased ? '' : 'required'} min="0" type="number" name="stock" value="${e(fresh.stock)}">
          </div>
          <div class="field">
            <label>باركود</label>
            <input name="barcode" value="${e(fresh.barcode||'')}" placeholder="اختياري">
          </div>
        ` : ''}
      </div>
      
      <div id="weight-pricing-section" style="${fresh.isWeightBased ? '' : 'display:none;'}">
        <div class="field">
          <label>إدارة الأوزان والأسعار</label>
          <div class="variants-manager" id="variants-list">
            <div class="variant-row" style="font-weight:bold; font-size:11px; color:var(--muted); border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:8px">
              <div>الوزن *</div>
              <div>السعر *</div>
              ${grocery ? '<div>المخزون *</div>' : ''}
              <div>الباركود</div>
              <div></div>
            </div>
            <div id="variant-rows-container">
              ${variantsHtml}
            </div>
            <button type="button" class="add-variant-btn" data-action="add-variant-row">＋ إضافة خيار وزن جديد</button>
          </div>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="primary">${product?'💾 حفظ التعديلات':'✓ إضافة المنتج'}</button>
        <button type="button" class="ghost" data-action="close-modal">إلغاء</button>
      </div>
    </form>
  `;
  document.body.append(box);
  box.querySelector('form').addEventListener('submit',saveProduct);
}

function saveProduct(event){
  event.preventDefault();
  const formEl = event.currentTarget;
  const values = Object.fromEntries(new FormData(formEl));
  
  const idVal = values.id || id();
  const nameVal = values.name;
  const categoryVal = values.category;
  const emojiVal = values.emoji;
  const isWeightBasedVal = formEl.elements.isWeightBased.checked;
  
  let product = {
    id: idVal,
    name: nameVal,
    category: categoryVal,
    emoji: emojiVal,
    isWeightBased: isWeightBasedVal
  };
  
  if (isWeightBasedVal) {
    const container = document.getElementById('variant-rows-container');
    const rows = container.querySelectorAll('.variant-row');
    const variants = [];
    
    rows.forEach((row, i) => {
      const vName = values[`v_name_${i}`];
      const vPrice = Number(values[`v_price_${i}`] || 0);
      const vStock = usesInventory() ? Number(values[`v_stock_${i}`] || 0) : 999;
      const vBarcode = values[`v_barcode_${i}`] || '';
      
      variants.push({
        id: 'v_' + id() + '_' + i,
        name: vName,
        price: vPrice,
        stock: vStock,
        barcode: vBarcode
      });
    });
    
    if (variants.length === 0) {
      toast('يرجى إضافة خيار وزن واحد على الأقل للمنتج', 'error');
      return;
    }
    
    product.variants = variants;
  } else {
    product.price = Number(values.price || 0);
    product.stock = usesInventory() ? Number(values.stock || 0) : 999;
    product.barcode = values.barcode || '';
  }
  
  const products = cur().products;
  const index = products.findIndex(p => p.id === product.id);
  const isNew = index < 0;
  
  if (index >= 0) products[index] = product;
  else products.push(product);
  
  // تسجيل حركة المخزن
  if (isNew) {
    if (product.isWeightBased && product.variants) {
      product.variants.forEach(v => {
        if (usesInventory()) {
          logInv({ type: 'add_product', productName: product.name, emoji: product.emoji, variant: v.name, qty: v.stock, mode: state.mode });
        }
      });
    } else {
      logInv({ type: 'add_product', productName: product.name, emoji: product.emoji, qty: usesInventory() ? product.stock : null, mode: state.mode });
    }
  } else {
    logInv({ type: 'edit_product', productName: product.name, emoji: product.emoji, qty: null, mode: state.mode });
  }
  
  persist();
  document.querySelector('.modal-backdrop').remove();
  toast(isNew ? 'تمت إضافة المنتج' : 'تم حفظ التعديلات');
  render();
}

function add(id, variantId = null) {
  const product = cur().products.find(p => p.id === id);
  if (!product) return;
  
  if (product.isWeightBased && !variantId) {
    showQuickWeightModal(product);
    return;
  }
  
  const variant = variantId && product.variants ? product.variants.find(v => v.id === variantId) : null;
  const price = variant ? variant.price : product.price;
  const name = variant ? `${product.name} (${variant.name})` : product.name;
  const stock = variant ? variant.stock : product.stock;
  const cartId = variant ? `${product.id}_${variant.id}` : product.id;
  
  const existing = state.cart.find(i => i.cartId === cartId);
  const currentQty = existing ? existing.qty : 0;
  
  if (usesInventory() && stock < (currentQty + 1)) {
    toast(t('lowStockToast'), 'error');
    return;
  }
  
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({
      cartId,
      id: product.id,
      name,
      productName: product.name,
      price,
      emoji: product.emoji,
      qty: 1,
      variantId: variant ? variant.id : null,
      variantName: variant ? variant.name : null
    });
  }
  render();
}

function quantity(cartId, delta) {
  const item = state.cart.find(i => i.cartId === cartId);
  if (!item) return;
  
  if (delta < 0 && item.qty === 1) {
    state.cart = state.cart.filter(i => i.cartId !== cartId);
  } else if (delta > 0) {
    const product = cur().products.find(p => p.id === item.id);
    const stock = item.variantId ? product.variants.find(v => v.id === item.variantId).stock : product.stock;
    if (usesInventory() && stock < (item.qty + 1)) {
      toast(t('lowStockToast'), 'error');
      return;
    }
    item.qty++;
  } else {
    item.qty += delta;
  }
  render();
}

async function checkout(){
  if (!state.cart.length) return;
  try {
    await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify({ items: state.cart, total: total() })
    });
  } catch (error) {
    toast(error.message || 'Unable to complete the sale', 'error');
    return;
  }
  if (usesInventory()){
    for (const item of state.cart){
      const product = cur().products.find(p=>p.id===item.id);
      if (item.variantId) {
        const variant = product.variants.find(v=>v.id===item.variantId);
        variant.stock -= item.qty;
      } else {
        product.stock -= item.qty;
      }
      logInv({ type: 'stock_out', productName: product.name, emoji: product.emoji, variant: item.variantName, qty: -item.qty, mode: state.mode });
    }
  }
  const order = {id:id(),mode:state.mode,items:clone(state.cart),total:total(),date:new Date().toISOString()};
  state.orders.unshift(order);
  state.cart=[];
  persist();
  toast(t('checkoutSuccess'));
  render();
  showReceiptModal(order);
}

document.addEventListener('click',event=>{
  const el=event.target.closest('[data-action]');
  if(!el)return;
  const a=el.dataset.action;
  
  if (a === 'logout') {
    clearAuthSession();
    state.mode = null;
    state.cart = [];
    persist();
    toast(t('logoutSuccessToast'));
    render();
    return;
  }
  if (a === 'quick-login') {
    const form = document.querySelector('#login-form');
    if (form) {
      form.elements.username.value = el.dataset.user;
      form.elements.password.value = el.dataset.pass;
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
    return;
  }
  if (a === 'view-subscription') {
    showSubscriptionModal();
    return;
  }
  if (a === 'close-modal') {
    document.querySelector('.modal-backdrop')?.remove();
    return;
  }
  if (a === 'set-lang') {
    state.lang = el.dataset.lang;
    persist();
    render();
    return;
  }
  if (a === 'clear-logo') {
    state.settings.logo = '';
    persist();
    toast(t('logoRemovedToast'));
    render();
    return;
  }

  // SPEC 002 — شاشة طلب اشتراك جديد
  if (a === 'show-new-sub') {
    state.showNewSub = true;
    render();
    return;
  }
  if (a === 'back-to-login') {
    state.showNewSub = false;
    render();
    return;
  }

  // SPEC 002 — إدارة الطاقم
  if (a === 'new-staff') {
    if (state.user?.role !== 'manager') return;
    showStaffModal(null);
    return;
  }
  if (a === 'edit-staff') {
    if (state.user?.role !== 'manager') return;
    const staffId = el.dataset.staffid;
    const emp = state.staffList.find(s => s.id == staffId);
    if (emp) showStaffModal(emp);
    return;
  }
  if (a === 'toggle-staff') {
    if (state.user?.role !== 'manager') return;
    const staffId = el.dataset.staffid;
    const isCurrentlyActive = el.dataset.active === 'true';
    const confirmMsg = isCurrentlyActive ? t('confirmDisableStaff') : t('confirmEnableStaff');
    if (!confirm(confirmMsg)) return;
    (async () => {
      try {
        await apiRequest(`/staff/${staffId}`, {
          method: 'PATCH',
          body: JSON.stringify({ is_active: !isCurrentlyActive })
        });
        toast(isCurrentlyActive ? t('staffDisabledToast') : t('staffEnabledToast'));
        await loadStaff();
      } catch (err) {
        toast(err.message || t('staffSaveError'), 'error');
      }
    })();
    return;
  }
  // SPEC 002 — لوحة المشرف العام (super_admin)
  if (a === 'choose-admin') {
    if (state.user?.role !== 'super_admin') return;
    state.mode = 'grocery';
    state.screen = 'admin_requests';
    render();
    loadAdminRequests();
    return;
  }
  if (a === 'set-admin-tab') {
    if (state.user?.role !== 'super_admin') return;
    state.adminTabStatus = el.dataset.tab;
    render();
    loadAdminRequests();
    return;
  }
  if (a === 'refresh-admin-reqs') {
    if (state.user?.role !== 'super_admin') return;
    loadAdminRequests();
    return;
  }
  if (a === 'approve-admin-req') {
    if (state.user?.role !== 'super_admin') return;
    const reqId = el.dataset.reqid;
    if (!confirm('هل أنت متأكد من الموافقة وتفعيل الاشتراك لمدة 30 يومًا؟')) return;
    (async () => {
      try {
        const res = await apiRequest(`/admin/payment-requests/${reqId}/approve`, { method: 'POST' });
        toast(res.message || 'تمت الموافقة وتفعيل الاشتراك بنجاح');
        await loadAdminRequests();
      } catch (err) {
        toast(err.message || 'فشلت عملية الموافقة', 'error');
      }
    })();
    return;
  }
  if (a === 'reject-admin-req') {
    if (state.user?.role !== 'super_admin') return;
    const reqId = el.dataset.reqid;
    const reason = prompt('سبب الرفض (اختياري):');
    (async () => {
      try {
        await apiRequest(`/admin/payment-requests/${reqId}/reject`, {
          method: 'POST',
          body: JSON.stringify({ reason })
        });
        toast('تم رفض الطلب بنجاح');
        await loadAdminRequests();
      } catch (err) {
        toast(err.message || 'فشلت عملية الرفض', 'error');
      }
    })();
    return;
  }

  // Check permissions for user actions
  if (state.user) {
    const editActions = ['new-product', 'edit-product', 'delete-product', 'stock', 'variant-stock'];
    if (editActions.includes(a)) {
      if (state.user.role !== 'manager' && state.user.role !== 'storekeeper') {
        toast(t('noPermissionEdit'), 'error');
        return;
      }
    }
    const posActions = ['checkout', 'add', 'select-weight', 'qty', 'clear-cart', 'remove', 'clear-cart'];
    if (posActions.includes(a)) {
      if (state.user.role !== 'manager' && state.user.role !== 'cashier') {
        toast(t('noPermissionSale'), 'error');
        return;
      }
    }
    if (a === 'clear-orders') {
      if (state.user.role !== 'manager') {
        toast(t('noPermissionClear'), 'error');
        return;
      }
    }
  }

  if(a==='choose'){
    state.mode=el.dataset.mode;
    if (state.user && state.user.role === 'storekeeper') {
      state.screen = 'inventory';
    } else {
      state.screen = 'pos';
    }
    state.category='الكل';
  }
  if(a==='home'){
    state.mode=null;
    state.cart=[];
  }
  if(a==='screen') {
    state.screen=el.dataset.screen;
    // SPEC 002: تحميل قائمة الموظفين تلقائيًا عند فتح تبويب إدارة الطاقم
    if (el.dataset.screen === 'staff') {
      state.staffList = [];
      render();
      loadStaff();
      return;
    }
    if (el.dataset.screen === 'admin_requests') {
      state.adminRequestsList = [];
      render();
      loadAdminRequests();
      return;
    }
  }
  if(a==='category') state.category=el.dataset.category;
  if(a==='add') add(el.dataset.id);
  if(a==='select-weight') {
    add(el.dataset.pid, el.dataset.vid);
    document.querySelector('.modal-backdrop')?.remove();
  }
  if(a==='clear-cart') state.cart=[];
  if(a==='remove'){
    state.cart=state.cart.filter(i=>i.cartId!==el.dataset.cartid);
  }
  if(a==='qty') quantity(el.dataset.cartid, Number(el.dataset.delta));
  if(a==='checkout') checkout();
  if(a==='new-product') modal();
  if(a==='edit-product') modal(cur().products.find(p=>p.id===el.dataset.id));
  if(a==='delete-product'&&confirm(t('confirmDeleteProduct'))){
    cur().products=cur().products.filter(p=>p.id!==el.dataset.id);
    persist();
    toast(t('productDeletedToast'),'error');
  }
  if(a==='stock'){
    const p=cur().products.find(p=>p.id===el.dataset.id);
    const delta = Number(el.dataset.delta);
    const oldStock = p.stock;
    p.stock=Math.max(0,p.stock+delta);
    const actualDelta = p.stock - oldStock;
    if (actualDelta !== 0) {
      logInv({ type: actualDelta > 0 ? 'stock_in' : 'stock_out', productName: p.name, emoji: p.emoji, qty: actualDelta, mode: state.mode });
    }
    persist();
    toast(t('stockUpdatedToast'));
  }
  if(a==='variant-stock'){
    const p=cur().products.find(p=>p.id===el.dataset.pid);
    const v=p.variants.find(v=>v.id===el.dataset.vid);
    const delta = Number(el.dataset.delta);
    const oldStock = v.stock;
    v.stock=Math.max(0,v.stock+delta);
    const actualDelta = v.stock - oldStock;
    if (actualDelta !== 0) {
      logInv({ type: actualDelta > 0 ? 'stock_in' : 'stock_out', productName: p.name, emoji: p.emoji, variant: v.name, qty: actualDelta, mode: state.mode });
    }
    persist();
    toast(t('stockUpdatedToast'));
  }
  if(a==='clear-orders'&&confirm(t('confirmClearOrders'))){
    state.orders=[];
    persist();
    toast(t('ordersClearedToast'),'error');
  }
  if(a==='clear-invlog'&&confirm(t('confirmClearInvLog'))){
    state.invLog=[];
    persist();
    toast(t('invLogClearedToast'),'error');
  }
  if(a==='emoji'){
    const form=el.closest('form');
    form.elements.emoji.value=el.dataset.emoji;
    form.querySelectorAll('[data-action="emoji"]').forEach(x=>x.classList.toggle('selected',x===el));
  }
  if(a==='emoji-tab'){
    currentEmojiCategory = el.dataset.cat;
    el.closest('.emoji-tabs').querySelectorAll('.emoji-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn === el);
    });
    const emojiCategories = {
      fruits: ['🍎','🍏','🍊','🍋','🍌','🍉','🍇','🍓','🫒','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧅','🥔','🍠','🍍','🥭','🥥','🥝','🍒','🍑'],
      meals: ['🍞','🥖','🥐','🍳','🥩','🍗','🍖','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🥙','🧆','🥘','🍲','🥗','🍿','🍱','🥟','🍤','🐟','🦀','🦞','🐙'],
      sweets: ['🎂','🍰','🧁','🥧','🍩','🍪','🍫','🍬','🍭','🍮','🍯','🍨','🍦','🥜','🫘'],
      drinks: ['💧','🥛','🥤','🧃','☕','🫖','🍵','🍶','🧋','🍾'],
      cleaning: ['🧼','🧽','🧴','🧹','🧺','🧻','🗑️','🕯️'],
      pharmacy: ['💊','💉','🩹','🩺','🧪','😷','🧴','🧼','🩻','🦷','👓','🦼','🩼','🩸','🫁','🧬','🧫','🍼'],
      books: ['📚','📖','📕','📗','📘','📙','📒','📓','📝','✏️','🖊️','🖍️','🖇️','📎','📐','🎒','🔖','🗂️'],
      electronics: ['📱','💻','⌨️','🖥️','🖨️','🖱️','🎧','🎮','📷','📺','⌚','🔋','🔌','💡','🔦','📡','🎙️','📀'],
      clothing: ['👕','👔','👗','👚','🧥','🥼','🦺','👖','🩳','👟','👞','👠','🥾','🧢','🎩','🧤','🧣','👜'],
      general: ['📦','🛍️','🏷️','🎁','🛒','🍽️','🏪','💰','🧾','🪑','🔧','🧸']
    };
    const form = el.closest('form');
    const curEmoji = form.elements.emoji.value;
    const grid = document.getElementById('emoji-picker-grid');
    grid.innerHTML = emojiCategories[currentEmojiCategory].map(x => {
      const selected = curEmoji === x ? 'selected' : '';
      return `<button type="button" class="${selected}" data-action="emoji" data-emoji="${x}">${x}</button>`;
    }).join('');
  }
  if(a==='add-variant-row'){
    const container = document.getElementById('variant-rows-container');
    const count = container.querySelectorAll('.variant-row').length;
    const grocery = usesInventory();
    
    const newRow = document.createElement('div');
    newRow.className = 'variant-row';
    newRow.dataset.index = count;
    newRow.innerHTML = `
      <input required placeholder="مثال: 1كغ" name="v_name_${count}">
      <input required min="0" type="number" placeholder="السعر" name="v_price_${count}">
      ${grocery ? `<input required min="0" type="number" placeholder="المخزون" name="v_stock_${count}">` : `<input type="hidden" name="v_stock_${count}" value="999">`}
      <input placeholder="الباركود" name="v_barcode_${count}">
      <button type="button" class="tiny delete" style="padding:10px" data-action="remove-variant-row" data-index="${count}">×</button>
    `;
    container.appendChild(newRow);
  }
  if(a==='remove-variant-row'){
    const row = el.closest('.variant-row');
    row.remove();
    const container = document.getElementById('variant-rows-container');
    container.querySelectorAll('.variant-row').forEach((row, i) => {
      row.dataset.index = i;
      row.querySelectorAll('input').forEach(input => {
        const nameAttr = input.getAttribute('name');
        if (nameAttr) {
          const fieldName = nameAttr.split('_')[1];
          input.setAttribute('name', `v_${fieldName}_${i}`);
        }
      });
      const delBtn = row.querySelector('[data-action="remove-variant-row"]');
      if (delBtn) delBtn.dataset.index = i;
    });
  }
  render();
});

document.addEventListener('input',event=>{
  if(event.target.dataset.input==='query'){
    state.query=event.target.value;
    render();
  }
});

document.addEventListener('keydown',event=>{
  if(event.target.dataset.input==='barcode'&&event.key==='Enter'){
    event.preventDefault();
    
    // Check permission for Cashier or Manager
    if (state.user && state.user.role !== 'manager' && state.user.role !== 'cashier') {
      toast('عذراً، لا تملك الصلاحية لإجراء المبيعات والطلبات', 'error');
      event.target.value = '';
      return;
    }

    const barcodeVal = event.target.value.trim();
    if (!barcodeVal) return;
    
    let foundProduct = null;
    let foundVariant = null;
    
    for (const p of cur().products) {
      if (p.isWeightBased) {
        const v = p.variants.find(v => v.barcode === barcodeVal);
        if (v) {
          foundProduct = p;
          foundVariant = v;
          break;
        }
      } else if (p.barcode === barcodeVal) {
        foundProduct = p;
        break;
      }
    }
    
    if (foundProduct) {
      add(foundProduct.id, foundVariant ? foundVariant.id : null);
      toast(`✓ تمت إضافة ${foundProduct.name}${foundVariant ? ` (${foundVariant.name})` : ''}`);
    } else {
      toast('الباركود غير موجود', 'error');
    }
    event.target.value = '';
  }
});

render();
if (state.user && state.token) refreshSubscription();
