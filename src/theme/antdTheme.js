/**
 * Ant Design theme configuration matching AI Study Hub design system.
 * Orange primary palette with rounded, modern aesthetic.
 */
const antdTheme = {
  token: {
    // Primary colors
    colorPrimary: '#ea580c',
    colorPrimaryBg: '#fff7ed',
    colorPrimaryBorder: '#fed7aa',
    colorPrimaryHover: '#c2410c',
    colorPrimaryActive: '#9a3412',
    colorPrimaryText: '#ea580c',
    colorPrimaryTextHover: '#c2410c',

    // Background
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f2f6ff',
    colorBgElevated: '#ffffff',
    colorBgTextHover: '#fff7ed',

    // Text
    colorText: '#0b1c30',
    colorTextSecondary: '#5d5f5f',
    colorTextTertiary: '#94a3b8',
    colorTextQuaternary: '#cbd5e1',

    // Border
    colorBorder: '#e2e8f0',
    colorBorderSecondary: '#f1f5f9',

    // Error / Success / Warning
    colorError: '#ba1a1a',
    colorSuccess: '#16a34a',
    colorWarning: '#f59e0b',
    colorInfo: '#0284c7',

    // Border radius
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    borderRadiusXS: 6,

    // Typography
    fontFamily: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
    fontSize: 14,
    fontSizeHeading1: 36,
    fontSizeHeading2: 24,
    fontSizeHeading3: 18,
    fontSizeHeading4: 16,
    fontSizeSM: 12,
    fontSizeXL: 20,

    // Sizing
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,

    // Shadow
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    boxShadowSecondary: '0 6px 16px rgba(0, 0, 0, 0.08)',

    // Motion
    motionDurationFast: '0.15s',
    motionDurationMid: '0.25s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 40,
      controlHeightLG: 48,
      fontWeight: 700,
      primaryShadow: '0 2px 8px rgba(234, 88, 12, 0.2)',
    },
    Input: {
      borderRadius: 12,
      controlHeight: 42,
      activeBorderColor: '#ea580c',
      hoverBorderColor: '#fed7aa',
    },
    Select: {
      borderRadius: 12,
      controlHeight: 42,
    },
    Card: {
      borderRadiusLG: 24,
      paddingLG: 24,
    },
    Modal: {
      borderRadiusLG: 24,
    },
    Table: {
      borderRadius: 16,
      headerBg: '#fafbfe',
      headerColor: '#5d5f5f',
      rowHoverBg: '#fef7f0',
    },
    Menu: {
      itemBorderRadius: 16,
      itemHeight: 44,
      itemSelectedBg: '#ea580c',
      itemSelectedColor: '#ffffff',
      itemHoverBg: '#fff7ed',
      itemHoverColor: '#ea580c',
    },
    Tabs: {
      inkBarColor: '#ea580c',
      itemSelectedColor: '#ea580c',
      itemHoverColor: '#c2410c',
    },
    Tag: {
      borderRadiusSM: 12,
    },
    Progress: {
      defaultColor: '#ea580c',
    },
    Segmented: {
      borderRadius: 12,
      itemSelectedBg: '#ea580c',
      itemSelectedColor: '#ffffff',
    },
    Upload: {
      borderRadiusLG: 16,
    },
    Message: {
      borderRadiusLG: 12,
    },
    Notification: {
      borderRadiusLG: 16,
    },
  },
};

export default antdTheme;
