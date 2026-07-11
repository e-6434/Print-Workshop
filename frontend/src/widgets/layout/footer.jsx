 

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
<footer className="w-full bg-white border-t border-gray-200 py-6 mt-20" dir="rtl">
      <div className="container mx-auto px-6 text-center">

        <p className="text-gray-700 text-lg font-semibold">
       Erfan Ebrahimkhani
        </p>

        <p className="text-gray-500 text-sm mt-2">
        09193442597
        </p>

      </div>
    </footer>
  );
}

 
 

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
