export type UserRole = "SuperAdmin" | "Admin" | "User" | "Coach";

export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  pageNumber?: number;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  allowedUsers: UserRole[];
  extraFields?: Record<string, any>;
  children?: MenuItemTypes[];
  checkInUserState?: {
    key: keyof IUser;
    value: any;
  };
  applicablePermission?: {
    accessKey: string;
    permissionKey: string;
  };
  CustomIcon?: any;
}

export interface IUser {
  [x: string]: any;
}
export interface IPhoneProps extends IBaseCtrl {
  label: string;
}

type IBaseCtrlRuleValidate = (value: string) => any;

interface IBaseCtrlRule {
  [key: string]:
    | IBaseCtrlRuleValidate
    | {
        value?: any;
        message?: string;
      };
  // validate?: (value?: any) => any;
}

type IBaseCtrlComponentName =
  | "PhoneNumber"
  | "Email"
  | "Website"
  | "Address"
  | "Name"
  | "FullName"
  | "Number";

export interface IBaseCtrl {
  control: any;
  showError: any;
  className?: string;
  placeholder: string;
  name: string;
  required: boolean;
  componentName?: IBaseCtrlComponentName;
  disabled: boolean;
  id?: string;
  float?: boolean;
  defaultValue?: any;
  hint?: string;
  rules?: IBaseCtrlRule;
  minLength?: number;
  maxLength?: number;
}

export interface ITextProps extends IBaseCtrl {
  label: string;
  inputProps?: any;
  rows?: number;
  defaultValue? :any 
}

export interface ISelectOption {
  value: string | number | any;
  label: string;
  item?: { [key: string]: any };
}

export interface ISelectProps extends IBaseCtrl {
  // type: string;
  label: string;
  options: ISelectOption[];
  endAdornment?: any;
  startAdornment?: any;
  startAdornmentIcon?: any;
  endAdornmentIcon?: any;
  inputProps?: any;
  onSelect?: (option: ISelectOption) => void;
  cb?: () => void;
  onChange?: (option: ISelectOption) => void;
  checked?: string;
  formatOptionLabel?: any;
}

export interface IInputProps extends IBaseCtrl {
  type: string;
  label: string;
  endAdornment?: any;
  startAdornment?: any;
  startAdornmentIcon?: any;
  endAdornmentIcon?: any;
  inputProps?: any;
  as?: "input" | "textarea";
  max?: string;
  min?: string;
  setValue?: any;
  setShowModal?: any;
  showManageBtn?: boolean;
  onChange?: any;
}

export interface IIcon {
  width?: number;
  height?: number;
  color?: string;
}

interface IActionPerformedBy {
  AddedBy: number;
  AddedOn: string;
  ModifiedBy: number;
  ModifiedOn: string;
  CreatedName: string;
}

export interface IFile extends IActionPerformedBy {
  id: number;
  FileName: string;
  FileUrl: string;
  Type: string;
  fileId: string;
  fullFileUrl: string;
}
export interface ICheckboxProps extends IBaseCtrl {
	label: string;
	inputProps?: any;
	className?: string;
	groupClassName?: string;
}
