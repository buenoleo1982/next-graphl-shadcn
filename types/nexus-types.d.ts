/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import 'nexus'

// Isso irá estender os tipos padrão do Nexus para aceitar a propriedade customizada `protectedOperation`.
declare module 'nexus' {
  interface FieldExtension {
    protectedOperation?: boolean
  }
}
