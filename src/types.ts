/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  iconName: 'code' | 'layers' | 'server' | 'zap';
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  company?: string;
  budget: string;
  message: string;
}
