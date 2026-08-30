import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import prev from "../assets/icons/prev.svg";
import next from "../assets/icons/next.svg";

function Search() {
  const { recipes, search, isLoading, error } = useSearch();
  const [currPage, setCurrPage] = useState<number>(1);
  const itemsPerPage: number = 9;

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  function renderCurrPageItems() {
    const startIndex = (currPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currItems = recipes.slice(startIndex, endIndex);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 xl:gap-8 mt-16">
        {currItems.map((item) => (
          <RecipeCard
            id={item.id}
            name={item.name}
            thumbnail={item.thumbnail}
            category={item.category}
          />
        ))}
      </div>
    );
  }

  function goToNextPage() {
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
      scrollTo(0, 0);
    }
  }

  function goToPrevPage() {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
      scrollTo(0, 0);
    }
  }

  function goToSpecificPage(pageNumber: number) {
    setCurrPage(pageNumber);
    scrollTo(0, 0);
  }

  function renderPaginationControls() {
    return (
      totalPages > 1 && (
        <div className="flex items-center justify-end gap-2.5 mt-8">
          {currPage !== 1 && (
            <button
              className="button-square-small lg:button-square button-green border-2 lg:border-4 cursor-pointer"
              onClick={goToPrevPage}
              disabled={currPage === 1}
            >
              <img className="w-4 lg:w-6" src={prev} alt="Previous page" />
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              className="button-square-small lg:button-square button-green border-2 text-sm lg:text-base lg:border-4 cursor-pointer"
              key={i}
              onClick={() => goToSpecificPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          {currPage !== totalPages && (
            <button
              className="button-square-small lg:button-square button-green border-2 lg:border-4 cursor-pointer"
              onClick={goToNextPage}
              disabled={currPage === totalPages}
            >
              <img className="w-4 lg:w-6" src={next} alt="Nextpage" />
            </button>
          )}
        </div>
      )
    );
  }

  return (
    <div className="section-small lg:section">
      <SearchBar search={search} />

      {isLoading && <LoadingSpinner />}
      {error && <p className="error-text">{error}</p>}
      {!isLoading && !error && recipes.length === 0 && (
        <p className="text-center py-16">
          No recipes found. Try a different search.
        </p>
      )}

      {!isLoading && (
        <div>
          {renderCurrPageItems()}
          {renderPaginationControls()}
        </div>
      )}
    </div>
  );
}

export default Search;
