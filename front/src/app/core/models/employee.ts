
export type EmployeeStatus = 'Active' | 'Inactive';

export interface Employee{
    id:number;
    empNumber:string;
    fNameAr:string;lNameAr:string;
    fNameEn:string;lNameEn:string;
    email:string;
    phone:string;
    deptId:number;
    jobTitleId:number;
    hireDate:string;
    salary:number;
    status:EmployeeStatus;
}

export type CreateEmployeeDto = Omit<Employee,'id'>;
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

export interface EmployeeQuery {
  page: number;
  pageSize: number;
  search?: string;
  deptId?: number;
  status?: EmployeeStatus;
}