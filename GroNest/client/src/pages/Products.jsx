import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import "./Products.css";

function Products() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  const searchText = (searchParams.get("search") || "").toLowerCase();
  const selectedCategory = searchParams.get("category") || "all";

  const categoryDefinitions = [
    {
      key: "daily-essentials",
      title: "Daily Essentials",
      matcher: (name) => /(milk|bread|rice|oats)/i.test(name),
    },
    {
      key: "cooking-essentials",
      title: "Cooking Essentials",
      matcher: (name) => /(tomato|onion|potato|carrot|oil)/i.test(name),
    },
    {
      key: "fresh-produce",
      title: "Fresh Produce",
      matcher: (name) =>
        /(apple|banana|grape|mango|orange|spinach|cabbage|cauliflower|beetroot)/i.test(name),
    },
    {
      key: "snacks-munchies",
      title: "Snacks & Munchies",
      matcher: (name) => /(chips|snack|pringles|biscuit)/i.test(name),
    },
  ];

  useEffect(() => {

    let mounted = true;

    fetchProducts()
      .then((data) => {
        if (!mounted) return;
        setProducts(data);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };

  }, []);

  const grouped = categoryDefinitions
    .map((category) => ({
      ...category,
      items: products.filter((item) => {
        const itemCategory = (item.category || "").toLowerCase();
        return itemCategory
          ? itemCategory === category.key
          : category.matcher(item.name);
      }),
    }))
    .filter((group) =>
      selectedCategory === "all" ? true : group.key === selectedCategory
    )
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.name.toLowerCase().includes(searchText)
      ),
    }))
    .filter((group) => group.items.length > 0);

  const unmatchedProducts = products
    .filter((item) => {
      const itemCategory = (item.category || "").toLowerCase();
      return !categoryDefinitions.some((category) => {
        if (itemCategory) return itemCategory === category.key;
        return category.matcher(item.name);
      });
    })
    .filter((item) => item.name.toLowerCase().includes(searchText));

  const filterOptions = [
    { key: "all", label: "All" },
    ...categoryDefinitions.map((category) => ({
      key: category.key,
      label: category.title,
    })),
  ];

  const handleFilterClick = (categoryKey) => {

    const params = new URLSearchParams(searchParams);

    if (categoryKey === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryKey);
    }

    setSearchParams(params);
  };

  return (
    <div className="products-page">

      <h1 className="products-title">All Groceries 🛒</h1>

      <p className="products-subtitle">
        Browse by shopping mission, not just one long list.
      </p>

      <div className="products-filters">

        {filterOptions.map((filter) => (

          <button
            key={filter.key}
            className={`filter-chip ${
              selectedCategory === filter.key ? "active" : ""
            }`}
            onClick={() => handleFilterClick(filter.key)}
          >
            {filter.label}
          </button>

        ))}

      </div>

      {loading && (
        <div className="products-loading">
          <div className="loading-spinner" />
          <span>Loading fresh groceries…</span>
        </div>
      )}

      {!loading &&
        grouped.map((group) => (

          <section key={group.key} className="products-section">

            <h2>{group.title}</h2>

            <div className="products-grid">

              {group.items.map((item, index) => (

                <div key={`${group.key}-${index}`} className="product-wrapper">

                  <ProductCard product={item} />
                </div>

              ))}

            </div>

          </section>

        ))}

      {!loading && unmatchedProducts.length > 0 && (

        <section className="products-section">

          <h2>More Picks</h2>

          <div className="products-grid">

            {unmatchedProducts.map((item, index) => (

              <div key={`more-${index}`} className="product-wrapper">

                <ProductCard product={item} />

              </div>

            ))}

          </div>

        </section>

      )}

      {!loading && grouped.length === 0 && unmatchedProducts.length === 0 && (

        <p className="empty-products">
          No products found for this selection.
        </p>

      )}

    </div>
  );
}

export default Products;