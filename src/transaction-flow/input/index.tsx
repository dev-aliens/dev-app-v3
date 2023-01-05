import dynamic from 'next/dynamic'

import TransactionLoader from '../TransactionLoader'
import type { Props as AdvancedEditorProps } from './AdvancedEditor/AdvancedEditor-flow'
import type { Props as BurnFusesProps } from './BurnFuses/BurnFuses-flow'
import type { Props as CreateSubnameProps } from './CreateSubname-flow'
import type { Props as EditResolverProps } from './EditResolver/EditResolver-flow'
import type { Props as ExtendNamesProps } from './ExtendNames/ExtendNames-flow'
import type { Props as ProfileEditorProps } from './ProfileEditor/ProfileEditor-flow'
import type { Props as SelectPrimaryNameProps } from './SelectPrimaryName-flow'
import type { Props as SendNameProps } from './SendName-flow'
import type { Props as TransferProfileProps } from './TransferProfile/TransferProfile-flow'

const dynamicHelper = <P,>(name: string) =>
  dynamic<P>(
    () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackExclude: /\.test.tsx$/ */
        `./${name}-flow`
      ),
    { loading: () => <TransactionLoader /> },
  )

const EditResolver = dynamicHelper<EditResolverProps>('EditResolver/EditResolver')
const SelectPrimaryName = dynamicHelper<SelectPrimaryNameProps>('SelectPrimaryName')
const AdvancedEditor = dynamicHelper<AdvancedEditorProps>('AdvancedEditor/AdvancedEditor')
const ProfileEditor = dynamicHelper<ProfileEditorProps>('ProfileEditor/ProfileEditor')
const CreateSubname = dynamicHelper<CreateSubnameProps>('CreateSubname')
const TransferProfile = dynamicHelper<TransferProfileProps>('TransferProfile/TransferProfile')
const ExtendNames = dynamicHelper<ExtendNamesProps>('ExtendNames/ExtendNames')
const BurnFuses = dynamicHelper<BurnFusesProps>('BurnFuses/BurnFuses')
const SendName = dynamicHelper<SendNameProps>('SendName')

export const DataInputComponents = {
  EditResolver,
  ProfileEditor,
  AdvancedEditor,
  SelectPrimaryName,
  TransferProfile,
  CreateSubname,
  ExtendNames,
  BurnFuses,
  SendName,
}

export type DataInputName = keyof typeof DataInputComponents

export type DataInputComponent = typeof DataInputComponents
