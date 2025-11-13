import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class TestFashionSite(unittest.TestCase):
    def setUp(self):
        self.index_html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.detail_html = (ROOT / "product-detail.html").read_text(encoding="utf-8")
        self.styles_css = (ROOT / "styles.css").read_text(encoding="utf-8")
        self.script_js = (ROOT / "script.js").read_text(encoding="utf-8")

    def test_header_contains_required_elements(self):
        self.assertIn("logo", self.index_html)
        self.assertIn("primary-nav", self.index_html)
        self.assertIn("search-form", self.index_html)
        self.assertIn("account-link", self.index_html)
        self.assertIn("cart-link", self.index_html)

    def test_product_grid_structure(self):
        self.assertIn("product-grid", self.index_html)
        self.assertIn("pagination", self.index_html)
        self.assertIn("paginationNumbers", self.index_html)

    def test_styles_include_responsive_rules(self):
        self.assertIn("@media", self.styles_css)
        self.assertIn("grid-template-columns", self.styles_css)

    def test_script_defines_products_and_pagination(self):
        self.assertIn("const products", self.script_js)
        self.assertIn("renderProducts", self.script_js)
        self.assertIn("updateView", self.script_js)

    def test_detail_page_contains_expected_sections(self):
        self.assertIn("product-detail", self.detail_html)
        self.assertIn("product-gallery", self.detail_html)
        self.assertIn("detail-section", self.detail_html)
        self.assertIn("product-description", self.detail_html)

    def test_script_handles_detail_interactions(self):
        self.assertIn("initDetailInteractions", self.script_js)
        self.assertIn("data-gallery-thumb", self.script_js)
        self.assertIn("data-quantity-input", self.script_js)


if __name__ == "__main__":
    unittest.main()
