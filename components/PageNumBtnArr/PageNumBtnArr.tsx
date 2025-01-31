import styles from "./styles.module.css";
import PageNumBtn from "../PageNumBtn/PageNumBtn";
import React, { useEffect, useState } from "react";

type PageNumBtnArrProps = {
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNumArr: null | number[];
};
const PageNumBtnArr = ({
  pageNum,
  setPageNum,
  pageNumArr,
}: PageNumBtnArrProps) => {
  const [position, setPosition] = useState(0);
  const [atStart, setAtStart] = useState(false);
  const [atEnds, setAtEnds] = useState(false);

  useEffect(() => {
    if (pageNum == 0 || pageNum == 1) {
      setAtStart(true);
      setAtEnds(false);
      return;
    }
    if (
      pageNum == pageNumArr!.length - 1 ||
      pageNum == pageNumArr!.length - 2
    ) {
      setAtStart(false);
      setAtEnds(true);
      return;
    } else {
      setAtStart(false);
      setAtEnds(false);
    }
  }, [pageNum]);

  return (
    <div className={styles.main}>
      {pageNum > 0 ? (
        <button
          onClick={() => {
            {
              setPageNum(pageNum - 1);
              setPosition(position + 40);
            }
          }}
        >
          Previous
        </button>
      ) : (
        <p>Previous</p>
      )}
      <div
        tabIndex={0}
        className={`${styles.pageNumberContainer} ${
          atStart && styles.containerAtStart
        } ${atEnds && styles.containerAtEnds} `}
      >
        <div className={styles.pageNumberArray}>
          {pageNumArr &&
            pageNumArr.map((num, index) => (
              <PageNumBtn
                key={index}
                setPageNum={setPageNum}
                pageNum={pageNum}
                index={index}
                pageNumArr={pageNumArr}
              />
            ))}
        </div>
      </div>
      {pageNumArr &&
        (pageNum < pageNumArr?.length - 1 ? (
          <button
            onClick={() => {
              setPageNum(pageNum + 1);
              setPosition(position - 40);
            }}
          >
            Next
          </button>
        ) : (
          <p>Next</p>
        ))}
    </div>
  );
};
export default PageNumBtnArr;
