'use client';

import { usePermissionList } from '@/api/admin/useMutation';
import {
  usePermissionDataQuery,
  useRoleCountDataQuery,
} from '@/api/admin/useQuery';
import AdminTableHeader from '@/components/atoms/admin/adminTableHeader';
import BackOfficeButton from '@/components/atoms/backOfficeButton';
import NoDataList from '@/components/atoms/category/noDataList';
import PageNation from '@/components/atoms/category/pageNation';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import AuthFilteredList from '@/components/pages/admin/AuthFilteredList';
import CategoryFiltered from '@/components/pages/admin/categoryFiltered';
import BackofficePage from '@/components/pages/backofficePage';
import {
  ADMIN_DEFAULT_PAGE,
  ADMIN_DEFAULT_PAGE_SIZE,
} from '@/constants/admin.constant';
import {
  clearAdminIds,
  setAllAdminIds,
} from '@/redux/slice/adminCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import {
  AdminDataInfoType,
  AdminListInfoType,
  AdminStatus,
  FilterParams,
} from '@/types/admin.types';
import { createToast } from '@/utils/toast';
import { useEffect, useRef, useState } from 'react';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState<number>(
    Number(ADMIN_DEFAULT_PAGE),
  );
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [selectedTabCount, setSelectedTabCount] = useState<number>(0);
  const [filters, setFilters] = useState<FilterParams>({
    trackRole: '',
    sort: 'DATE_LATELY',
    searchPeriod: '',
    keyword: '',
    status: '',
    page: 1,
    size: ADMIN_DEFAULT_PAGE_SIZE,
  });

  const { trackName: statusTrackName } = useAppSelector(
    (state) => state.authSlice,
  );
  const { postUserApproveMutate, deleteUsrRoleMutate } = usePermissionList();
  const { boardList } = usePermissionDataQuery(filters);

  const totalElements = boardList?.data.totalElements;
  const viewList = boardList?.data?.content;
  const { countList } = useRoleCountDataQuery();

  // 탭 변경 핸들러
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);

    setFilters(() => ({
      trackRole: '',
      sort: 'DATE_LATELY',
      searchPeriod: '',
      keyword: '',
      status: tab === 'All' ? '' : (tab as AdminStatus),
      page: 1,
      size: ADMIN_DEFAULT_PAGE_SIZE,
    }));
    setCurrentPage(1); // 페이지를 1로 초기화

    const count =
      tab === 'All'
        ? countList?.data?.statusAll || 0
        : tab === 'WAIT'
          ? countList?.data?.statusWait || 0
          : countList?.data?.statusApprove || 0;
    setSelectedTabCount(count);
  };

  // 초기 로드 시 기본 탭('All')의 카운트를 설정
  useEffect(() => {
    if (countList) {
      const initialCount = countList.data?.statusAll || 0;
      setSelectedTabCount(initialCount);
    }
  }, [countList]);
  /*검색 */
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = () => {
    const value = inputRef.current?.value ?? '';
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: value,
    }));
  };

  const handleCategoryChange = (category: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  /*체크박스*/
  const dispatch = useAppDispatch();
  const adminIds = useAppSelector((state) => state.adminCheckBoxSlice.adminIds);
  //id 추가
  const dataList = viewList?.map((item: AdminListInfoType) => ({
    ...item,
    adminId: item.email,
  }));

  const handleAllCheck = (checked: boolean) => {
    //체크한 id 목록들
    const currentPagePostIds = dataList.map(
      (item: AdminDataInfoType) => item.email,
    );
    dispatch(setAllAdminIds({ adminIds: currentPagePostIds, checked }));
  };

  const isAllChecked =
    dataList?.length > 0 &&
    dataList?.every((item: AdminDataInfoType) => adminIds.includes(item.email));

  const { adminIds: checkedAdminIds } = useAppSelector(
    (state) => state.adminCheckBoxSlice,
  );
  /*체크박스*/

  /*페이지 네이션 */

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  useEffect(() => {
    handleSearchChange();
  }, [filters.keyword]);

  /**전체 승인 조회 */
  const foundItems = checkedAdminIds.flatMap((email) =>
    viewList?.filter((item: AdminDataInfoType) => item.email === email),
  );

  const extractedData = foundItems.map(({ period, trackRole, email }) => ({
    trackName: statusTrackName,
    period,
    trackRole,
    email,
  }));

  const allApproveItems = async () => {
    extractedData.forEach((item) => {
      postUserApproveMutate.mutateAsync(item);
    });
    createToast(
      `${checkedAdminIds.length}건의 요청이 승인되었습니다.`,
      'primary',
      false,
    );
    dispatch(clearAdminIds());
  };

  const allRejectItems = async () => {
    extractedData.forEach((item) => {
      deleteUsrRoleMutate.mutateAsync(item);
    });
    createToast(
      `${checkedAdminIds.length}건의 요청이 거절되었습니다.`,
      'primary',
      false,
    );
    dispatch(clearAdminIds());
  };

  return (
    <>
      <BackofficePage>
        {/* 검색바 */}
        <SearchBar ref={inputRef} onChange={handleSearchChange} />

        {/* 게시판 */}
        <PermissionBoard>
          {/* 탭 메뉴 */}
          <TapMenu
            onTabChange={handleTabChange}
            selectedTab={selectedTab}
            countList={countList}
          />
          {/* 탭 메뉴 */}

          {/*카테고리 및 체크박스*/}

          <div className="flex flex-row justify-between py-[24px]">
            <CategoryFiltered handleCategoryChange={handleCategoryChange} />
            {checkedAdminIds.length > 0 && (
              <section className="flex flex-row gap-[8px]">
                <p className="flex h-[37px] w-[83px] items-center text-secondary-400">
                  {checkedAdminIds.length}개 선택
                </p>
                <BackOfficeButton onClick={allApproveItems}>
                  승인
                </BackOfficeButton>
                <BackOfficeButton variant="secondary" onClick={allRejectItems}>
                  거절
                </BackOfficeButton>
              </section>
            )}
          </div>

          {selectedTabCount === 0 ? (
            <NoDataList />
          ) : (
            <>
              {viewList?.length > 0 && (
                <AdminTableHeader
                  handleAllCheck={handleAllCheck}
                  isAllChecked={isAllChecked}
                />
              )}
              {viewList?.length > 0 ? (
                <>
                  <AuthFilteredList data={viewList} />
                  <div className="py-[24px]">
                    <PageNation
                      currentPage={currentPage}
                      totalElements={totalElements}
                      size={Number(ADMIN_DEFAULT_PAGE_SIZE)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              ) : (
                <NoDataList />
              )}
            </>
          )}
        </PermissionBoard>
      </BackofficePage>
    </>
  );
};

export default Admin;
