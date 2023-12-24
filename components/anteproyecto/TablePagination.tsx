import { usePagination } from "@/hooks/usePagination";

interface Props {
  totalCount: number;
  siblingCount?: number;
  currentPage:number;
  pageSize: number;
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
  onSetPage: ( index: number ) => void;
}

export const TablePagination = ({
  totalCount, 
  siblingCount = 1, 
  currentPage, 
  pageSize, 
  onNext, 
  onPrev, 
  canNext, 
  canPrev,
  onSetPage,
} : Props) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (  paginationRange.length < 2 ) return null;

  const currentPageItemCSS = 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700';
  const defaultPageItemCSS = 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer';

  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
            <button 
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 rounded-s-md  ${
                canPrev
                ? 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                : 'text-gray-300 bg-gray-100 hover:cursor-not-allowed'
              }`}
              disabled={!canPrev}
              onClick={() => onPrev()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
        </li>
        {
          paginationRange.map(pageNumber => {
            if ( pageNumber === '...' ) {
              return <li className={`flex items-center justify-center px-3 h-8 ${defaultPageItemCSS}`}></li>
            }

            return (
              <li
                key={ pageNumber }
                className={`flex items-center justify-center px-3 h-8 ${
                  pageNumber === currentPage 
                  ? currentPageItemCSS
                  : defaultPageItemCSS
                }`}
                onClick={() => onSetPage( pageNumber as number - 1 )}
              >
                { pageNumber }
              </li>
            )
          })
        }
        <li>
          <button 
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 rounded-e-md ${
                canNext
                ? 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                : 'text-gray-300 bg-gray-100 hover:cursor-not-allowed'
              }`}

            disabled={!canNext}
            onClick={() => onNext()}
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            </li>
        </ul>
    </nav>
  )
}
