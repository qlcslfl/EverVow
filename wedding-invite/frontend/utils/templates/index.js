// 템플릿 컴포넌트 import
import ModernMinimalTemplate from './template1-modern-minimal';
import ClassicElegantTemplate from './template2-classic-elegant';
import NatureGardenTemplate from './template3-nature-garden';
import VintageRomanceTemplate from './template4-vintage-romance';
import LuxuryGoldTemplate from './template5-luxury-gold';
import OceanBlueTemplate from './template6-ocean-blue';
import PastelDreamTemplate from './template7-pastel-dream';
import AutumnHarvestTemplate from './template8-autumn-harvest';
import EmeraldForestTemplate from './template9-emerald-forest';
import MonochromeChicTemplate from './template10-monochrome-chic';

// 템플릿 메타데이터 import
import { templates as templateMetadata } from './templateData';

// 템플릿 컴포넌트 배열 (메타데이터와 컴포넌트 결합)
export const templates = [
  { ...templateMetadata[0], component: ModernMinimalTemplate },
  { ...templateMetadata[1], component: ClassicElegantTemplate },
  { ...templateMetadata[2], component: NatureGardenTemplate },
  { ...templateMetadata[3], component: VintageRomanceTemplate },
  { ...templateMetadata[4], component: LuxuryGoldTemplate },
  { ...templateMetadata[5], component: OceanBlueTemplate },
  { ...templateMetadata[6], component: PastelDreamTemplate },
  { ...templateMetadata[7], component: AutumnHarvestTemplate },
  { ...templateMetadata[8], component: EmeraldForestTemplate },
  { ...templateMetadata[9], component: MonochromeChicTemplate }
];

// 개별 템플릿 컴포넌트 export
export {
  ModernMinimalTemplate,
  ClassicElegantTemplate,
  NatureGardenTemplate,
  VintageRomanceTemplate,
  LuxuryGoldTemplate,
  OceanBlueTemplate,
  PastelDreamTemplate,
  AutumnHarvestTemplate,
  EmeraldForestTemplate,
  MonochromeChicTemplate
};

// 템플릿 ID로 컴포넌트 가져오기
export const getTemplateComponent = (templateId) => {
  const template = templates.find(t => t.id === templateId);
  return template?.component || ModernMinimalTemplate;
};

// 템플릿 메타데이터만 export (스타일 정보용)
export { templateMetadata };
