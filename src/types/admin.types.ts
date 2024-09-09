//체크박스 type
export type AdminDataInfoType = {
  adminId: string;
  username: string;
  trackRole: string;
  period: number;
  email: string;
  createdAt: string;
  auth: string;
};

//권한 조회 리스트 유저 타입
export type AdminListInfoType = {
  username: string;
  trackRole: string;
  period: number;
  email: string;
  createdAt: string;
  auth: string;
};

export type USERDATA = {
  trackName: string;
  period: number;
  trackRole: string;
  email: string;
  loginPeriod: number;
  trackId: number;
};

export type DeleteUserType = {
  trackName: string;
  period: number;
  trackRole: string;
  email: string;
};

export type ApproveItem = Pick<
  USERDATA,
  'trackName' | 'email' | 'trackRole' | 'period'
>;

export type RejectionItem = Pick<
  USERDATA,
  'trackName' | 'loginPeriod' | 'trackId'
>;
export type CountListData = {
  statusAll: number;
  statusApprove: number;
  statusWait: number;
};
export interface TapProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  countList: { data: CountListData };
}

export interface FilteredListProps {
  data: AdminDataInfoType[];
}

export type adminStatus = 'WAIT' | 'APPROVE' | 'REJECT' | '';
export interface FilterParams {
  trackRole: string;
  sort: 'DATE_LATELY' | 'NAME_ALPHABETICALLY' | '';
  searchPeriod: string;
  keyword: string;
  page: number;
  size: string;
  status: adminStatus;
}

export type SearchAdminType = {
  tapType: string | undefined;
  searchPeriod: string | undefined;
  searchKeyword: string | undefined;
  page: string | undefined;
  size: string | undefined;
};

export type TabCountMapProps = {
  All: string;
  WAIT: string;
  APPROVE: string;
};
