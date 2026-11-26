(() => {
    'use strict';

    const languageStorageKey = 'croplink-language';
    const languageLocales = { en: 'en-LK', si: 'si-LK', ta: 'ta-LK' };
    const translations = {
        si: {
            'CropLink | Dashboard': 'CropLink | පාලක පුවරුව',
            'CropLink | Farmers': 'CropLink | ගොවීන්',
            'CropLink | Buyer demand': 'CropLink | ගැනුම්කරුවන්ගේ ඉල්ලුම',
            'CropLink | Smart matches': 'CropLink | ස්මාර්ට් ගැළපීම්',
            'CropLink | Allocations': 'CropLink | වෙන්කිරීම්',
            Language: 'භාෂාව',
            'Choose language': 'භාෂාව තෝරන්න',
            'SUPPLY COORDINATION': 'සැපයුම් සම්බන්ධීකරණය',
            WORKSPACE: 'වැඩබිම',
            Dashboard: 'පාලක පුවරුව',
            Farmers: 'ගොවීන්',
            'Buyer demand': 'ගැනුම්කරුවන්ගේ ඉල්ලුම',
            'Smart matches': 'ස්මාර්ට් ගැළපීම්',
            Allocations: 'වෙන්කිරීම්',
            'Need help?': 'උදව් අවශ්‍යද?',
            'Ask a question about using CropLink.': 'CropLink භාවිතය ගැන ප්‍රශ්නයක් අසන්න.',
            'Ask a question about managing farmer supplies.': 'ගොවි සැපයුම් කළමනාකරණය ගැන ප්‍රශ්නයක් අසන්න.',
            'Ask a question about buyer requests and matching.': 'ගැනුම්කරුවන්ගේ ඉල්ලීම් සහ ගැළපීම් ගැන ප්‍රශ්නයක් අසන්න.',
            'Ask how CropLink finds suitable farmer and buyer pairs.': 'CropLink ගොවීන් සහ ගැනුම්කරුවන් ගළපන ආකාරය අසන්න.',
            'See how CropLink plans fair supply allocations.': 'CropLink සැපයුම් සාධාරණව වෙන්කරන ආකාරය බලන්න.',
            'CropLink Demo': 'CropLink නිරූපණය',
            'e.g. Nimal Perera': 'උදා. Nimal Perera',
            'e.g. FreshMart': 'උදා. FreshMart',
            Status: 'තත්ත්වය',
            Coordinator: 'සම්බන්ධීකාරක',
            More: 'තවත්',
            Workspace: 'වැඩබිම',
            'Demo data active': 'නිරූපණ දත්ත සක්‍රියයි',
            Notifications: 'දැනුම්දීම්',
            'Network status': 'ජාල තත්ත්වය',
            'No new activity': 'අලුත් ක්‍රියාකාරකම් නැත',
            'Sign-in required': 'පුරනය වීම අවශ්‍යයි',
            'Firebase connected': 'Firebase සම්බන්ධයි',
            'Good morning': 'සුබ උදෑසනක්',
            'Good afternoon': 'සුබ දහවලක්',
            'Good evening': 'සුබ සන්ධ්‍යාවක්',
            'Good night': 'සුබ රාත්‍රියක්',
            ', Coordinator': ', සම්බන්ධීකාරක',
            'Here’s a quick look at your supply network today.': 'අද ඔබගේ සැපයුම් ජාලයේ කෙටි සාරාංශයක් මෙන්න.',
            'Find matches': 'ගැළපීම් සොයන්න',
            'Active farmers': 'සක්‍රිය ගොවීන්',
            'Buyer requests': 'ගැනුම්කරුවන්ගේ ඉල්ලීම්',
            'Potential matches': 'හැකි ගැළපීම්',
            'Available supply': 'පවතින සැපයුම',
            'Ready to supply': 'සැපයීමට සූදානම්',
            'Across multiple crops': 'විවිධ වගාවන් සඳහා',
            'Based on price and distance': 'මිල සහ දුර අනුව',
            'Across all listed produce': 'ලැයිස්තුගත සියලුම නිෂ්පාදන',
            'Harvest volume trends': 'අස්වනු ප්‍රමාණයේ ප්‍රවණතා',
            'Monthly harvest volume across the network': 'ජාලයේ මාසික අස්වනු ප්‍රමාණය',
            'Harvest volume': 'අස්වනු ප්‍රමාණය',
            'Illustrative demo data': 'නිදර්ශන දත්ත',
            'Demand by crop': 'වගාව අනුව ඉල්ලුම',
            'Requested quantities': 'ඉල්ලා ඇති ප්‍රමාණ',
            'View buyer requests': 'ගැනුම්කරුවන්ගේ ඉල්ලීම් බලන්න',
            'Top recommended matches': 'ඉහළම නිර්දේශිත ගැළපීම්',
            'Farmer and buyer combinations that best fit': 'හොඳින්ම ගැළපෙන ගොවි සහ ගැනුම්කරු යුගල',
            'See all matches': 'සියලුම ගැළපීම් බලන්න',
            'Recommended match details': 'නිර්දේශිත ගැළපීමේ විස්තර',
            'View details': 'විස්තර බලන්න',
            Farmer: 'ගොවියා',
            Buyer: 'ගැනුම්කරු',
            'Farmer location': 'ගොවියාගේ පිහිටීම',
            'Buyer location': 'ගැනුම්කරුගේ පිහිටීම',
            'Buyer maximum price': 'ගැනුම්කරුගේ උපරිම මිල',
            Distance: 'දුර',
            'Suitability score': 'ගැළපීමේ ලකුණු',
            'Price fit (35%)': 'මිල ගැළපීම (35%)',
            'Distance fit (45%)': 'දුර ගැළපීම (45%)',
            'Supply coverage (20%)': 'සැපයුම් ආවරණය (20%)',
            'Potential savings': 'හැකි ඉතිරිය',
            FARMER: 'ගොවියා',
            PRODUCT: 'නිෂ්පාදනය',
            BUYER: 'ගැනුම්කරු',
            QUANTITY: 'ප්‍රමාණය',
            DISTANCE: 'දුර',
            SUITABILITY: 'ගැළපීම',
            'CropLink demo. Please confirm availability, prices, and delivery details with each participant.': 'CropLink නිරූපණයකි. ලබාගත හැකි බව, මිල සහ බෙදාහැරීමේ විස්තර සම්බන්ධ පුද්ගලයන් සමඟ තහවුරු කරන්න.',
            'SUPPLY NETWORK': 'සැපයුම් ජාලය',
            'See who is supplying produce, where they are, and how much is available.': 'නිෂ්පාදන සපයන්නේ කවුද, ඔවුන් සිටින්නේ කොහේද සහ කොපමණ ප්‍රමාණයක් තිබේද යන්න බලන්න.',
            'Add farmer': 'ගොවියෙකු එක් කරන්න',
            'Registered farmers': 'ලියාපදිංචි ගොවීන්',
            'Across 10 growing regions': 'වගා කලාප 10ක',
            'Produce available': 'ලබාගත හැකි නිෂ්පාදන',
            'Total listed supply': 'ලැයිස්තුගත මුළු සැපයුම',
            'Crop varieties': 'වගා වර්ග',
            'Products in the network': 'ජාලයේ නිෂ්පාදන',
            'Farmer directory': 'ගොවි නාමාවලිය',
            'Available supply, asking price, and farm location': 'ලබාගත හැකි සැපයුම, ඉල්ලන මිල සහ ගොවිපළ පිහිටීම',
            'Search farmers or crops': 'ගොවීන් හෝ වගා සොයන්න',
            AVAILABLE: 'ලබාගත හැකිය',
            'ASKING PRICE': 'ඉල්ලන මිල',
            LOCATION: 'පිහිටීම',
            STATUS: 'තත්ත්වය',
            'Your farmer records are saved to your account.': 'ඔබගේ ගොවි වාර්තා ඔබගේ ගිණුමේ සුරැකේ.',
            'NEW SUPPLIER': 'නව සැපයුම්කරු',
            'Add a farmer': 'ගොවියෙකු එක් කරන්න',
            Close: 'වසන්න',
            'Farmer name': 'ගොවියාගේ නම',
            Product: 'නිෂ්පාදනය',
            'Select a crop': 'වගාවක් තෝරන්න',
            'Other (type a crop)': 'වෙනත් (වගාවේ නම ඇතුළත් කරන්න)',
            'Enter crop name': 'වගාවේ නම ඇතුළත් කරන්න',
            Rice: 'සහල්',
            Tomato: 'තක්කාලි',
            Potato: 'අර්තාපල්',
            Onion: 'ලූනු',
            Carrot: 'කැරට්',
            Banana: 'කෙසෙල්',
            Chili: 'මිරිස්',
            Cabbage: 'ගෝවා',
            Pumpkin: 'වට්ටක්කා',
            Papaya: 'පැපොල්',
            'Switch to Coordinator or Farmer role to add a farmer.': 'ගොවියෙකු එක් කිරීමට සම්බන්ධීකාරක හෝ ගොවි භූමිකාවට මාරු වන්න.',
            'Available quantity (kg)': 'ලබාගත හැකි ප්‍රමාණය (කි.ග්‍රෑ.)',
            'Asking price (LKR / kg)': 'ඉල්ලන මිල (රු. / කි.ග්‍රෑ.)',
            Location: 'පිහිටීම',
            'Select a location': 'පිහිටීමක් තෝරන්න',
            'Adding more of the same crop for the same farmer updates the existing supply total.': 'එකම ගොවියාගේ එකම වගාව නැවත එක් කළ විට පවතින සැපයුම් එකතුව යාවත්කාලීන වේ.',
            Cancel: 'අවලංගු කරන්න',
            'Save farmer': 'ගොවියා සුරකින්න',
            'MARKET DEMAND': 'වෙළඳපොළ ඉල්ලුම',
            'Buyer requests': 'ගැනුම්කරුවන්ගේ ඉල්ලීම්',
            'Keep track of what buyers need, how much they want, and their target price.': 'ගැනුම්කරුවන්ට අවශ්‍ය දේ, ප්‍රමාණය සහ ඉලක්ක මිල නිරීක්ෂණය කරන්න.',
            'Add buyer request': 'ගැනුම්කරුගේ ඉල්ලීම එක් කරන්න',
            'Open requests': 'විවෘත ඉල්ලීම්',
            'Active buyer requirements': 'සක්‍රිය ගැනුම්කරු අවශ්‍යතා',
            'Demand volume': 'ඉල්ලුම් ප්‍රමාණය',
            'Combined requested quantity': 'ඉල්ලා ඇති ඒකාබද්ධ ප්‍රමාණය',
            'Average target price': 'සාමාන්‍ය ඉලක්ක මිල',
            'Across all buyer requests': 'සියලුම ගැනුම්කරු ඉල්ලීම් සඳහා',
            'Buyer request board': 'ගැනුම්කරු ඉල්ලීම් පුවරුව',
            'Buyer requests matched against available farmer supply': 'ගොවීන්ගේ පවතින සැපයුම සමඟ ගැළපූ ගැනුම්කරු ඉල්ලීම්',
            'Search buyers or crops': 'ගැනුම්කරුවන් හෝ වගා සොයන්න',
            'QUANTITY NEEDED': 'අවශ්‍ය ප්‍රමාණය',
            'MAX PRICE': 'උපරිම මිල',
            'DELIVERY LOCATION': 'බෙදාහැරීමේ ස්ථානය',
            'Your buyer requests are saved to your account.': 'ඔබගේ ගැනුම්කරු ඉල්ලීම් ඔබගේ ගිණුමේ සුරැකේ.',
            'NEW DEMAND': 'නව ඉල්ලුම',
            'Add a buyer request': 'ගැනුම්කරුගේ ඉල්ලීමක් එක් කරන්න',
            'Buyer / business name': 'ගැනුම්කරු / ව්‍යාපාරයේ නම',
            'Quantity needed (kg)': 'අවශ්‍ය ප්‍රමාණය (කි.ග්‍රෑ.)',
            'Maximum price (LKR / kg)': 'උපරිම මිල (රු. / කි.ග්‍රෑ.)',
            'Save request': 'ඉල්ලීම සුරකින්න',
            'BUYER REQUEST': 'ගැනුම්කරුගේ ඉල්ලීම',
            'Request details': 'ඉල්ලීමේ විස්තර',
            'Close request details': 'ඉල්ලීමේ විස්තර වසන්න',
            'RECOMMENDATIONS': 'නිර්දේශ',
            'See which farmers best fit each buyer request and why.': 'එක් එක් ගැනුම්කරු ඉල්ලීමට වඩාත් ගැළපෙන ගොවීන් සහ ඊට හේතුව බලන්න.',
            'Refresh matches': 'ගැළපීම් යාවත්කාලීන කරන්න',
            'How we rank matches': 'ගැළපීම් ශ්‍රේණිගත කරන ආකාරය',
            'We first check that the crop fits and the price is within the buyer’s budget. Then we score price fit (35%), distance (45%), and available supply (20%).': 'පළමුව වගාව ගැළපේද සහ මිල ගැනුම්කරුගේ අයවැය තුළදැයි පරීක්ෂා කරයි. ඉන්පසු මිල ගැළපීම (35%), දුර (45%) සහ පවතින සැපයුම (20%) අනුව ලකුණු ලබාදේ.',
            'Eligible matches': 'සුදුසු ගැළපීම්',
            'Same crop and within budget': 'එකම වගාව සහ අයවැය තුළ',
            'Strong matches': 'ශක්තිමත් ගැළපීම්',
            'Suitability score 75% or higher': 'ගැළපීමේ ලකුණු 75% හෝ වැඩි',
            'Products matched': 'ගැළපූ නිෂ්පාදන',
            'Different crops requested': 'ඉල්ලා ඇති විවිධ වගා',
            'Recommended matches': 'නිර්දේශිත ගැළපීම්',
            'Best fit appears first.': 'වඩාත්ම ගැළපෙන ඒවා පළමුව පෙන්වයි.',
            'Search farmer, buyer, or crop': 'ගොවියා, ගැනුම්කරු හෝ වගාව සොයන්න',
            RANK: 'ශ්‍රේණිය',
            'FARMER TO BUYER': 'ගොවියා සිට ගැනුම්කරු දක්වා',
            'PRICE FIT': 'මිල ගැළපීම',
            'No eligible matches yet. Add compatible farmer supply or buyer requests to get started.': 'තවම සුදුසු ගැළපීම් නැත. ආරම්භ කිරීමට ගැළපෙන ගොවි සැපයුම් හෝ ගැනුම්කරු ඉල්ලීම් එක් කරන්න.',
            'Sri Lanka road route map': 'ශ්‍රී ලංකා මාර්ග සිතියම',
            'Select a match to load an OpenStreetMap driving route.': 'OpenStreetMap මාර්ගයක් පෙන්වීමට ගැළපීමක් තෝරන්න.',
            Route: 'මාර්ගය',
            'Select a match': 'ගැළපීමක් තෝරන්න',
            'Map showing an OpenStreetMap driving route in Sri Lanka': 'ශ්‍රී ලංකාවේ OpenStreetMap රියදුරු මාර්ගයක් පෙන්වන සිතියම',
            'Matched item quantity and price': 'ගැළපූ අයිතමයේ ප්‍රමාණය සහ මිල',
            'Zoom in': 'විශාල කරන්න',
            'Zoom out': 'කුඩා කරන්න',
            'Town and road route details': 'නගර සහ මාර්ග විස්තර',
            'Towns and roads on the online route': 'මාර්ගයේ නගර සහ මාර්ග',
            'Item quantity & price estimate': 'අයිතම ප්‍රමාණය සහ මිල ඇස්තමේන්තුව',
            'Select a match to load its online road route.': 'මාර්ගය පෙන්වීමට ගැළපීමක් තෝරන්න.',
            'Select a match to see quantity and price estimates.': 'ප්‍රමාණය සහ මිල ඇස්තමේන්තු බැලීමට ගැළපීමක් තෝරන්න.',
            'Recommendations are decision support. Confirm quality, availability, and delivery terms directly.': 'නිර්දේශ තීරණ ගැනීමට සහාය පමණි. ගුණාත්මකභාවය, ලබාගත හැකි බව සහ බෙදාහැරීමේ කොන්දේසි සෘජුව තහවුරු කරන්න.',
            'SUPPLY PLANNING': 'සැපයුම් සැලසුම් කිරීම',
            'Product allocation': 'නිෂ්පාදන වෙන්කිරීම',
            'Plan how available farmer supply can meet buyer requests.': 'පවතින ගොවි සැපයුමෙන් ගැනුම්කරු ඉල්ලීම් සපුරන ආකාරය සැලසුම් කරන්න.',
            'Run allocation': 'වෙන්කිරීම සිදු කරන්න',
            'How allocations work': 'වෙන්කිරීම් ක්‍රියා කරන ආකාරය',
            "CropLink starts with the strongest eligible matches and assigns supply until each buyer request or farmer's listed quantity is filled. It will not allocate more than a farmer has available. After a sale is completed, select Mark as sold to update both quantities.": 'CropLink වඩාත් සුදුසු ගැළපීම්වලින් ආරම්භ කර, ගැනුම්කරුගේ ඉල්ලීම හෝ ගොවියාගේ ලැයිස්තුගත ප්‍රමාණය පිරෙන තෙක් සැපයුම වෙන් කරයි. ගොවියා සතුව ඇති ප්‍රමාණයට වඩා වෙන් නොකරයි. විකිණීම අවසන් වූ පසු ප්‍රමාණ දෙකම යාවත්කාලීන කිරීමට “විකුණූ ලෙස සලකුණු කරන්න” තෝරන්න.',
            Allocated: 'වෙන් කළ ප්‍රමාණය',
            'Of compatible demand': 'ගැළපෙන ඉල්ලුමෙන්',
            'Unfilled demand': 'සපුරා නොමැති ඉල්ලුම',
            'Demand remaining after allocation': 'වෙන්කිරීමෙන් පසු ඉතිරි ඉල්ලුම',
            'Fulfilled requests': 'සපුරන ලද ඉල්ලීම්',
            'Buyer requests fully supplied': 'සම්පූර්ණයෙන් සැපයූ ගැනුම්කරු ඉල්ලීම්',
            'Suggested allocation plan': 'යෝජිත වෙන්කිරීමේ සැලැස්ම',
            'A buyer request can be supplied by more than one farm.': 'එක් ගැනුම්කරු ඉල්ලීමකට ගොවිපළ කිහිපයකින් සැපයිය හැකිය.',
            'Ready to review': 'සමාලෝචනයට සූදානම්',
            SALE: 'විකිණීම',
            ALLOCATED: 'වෙන් කළ ප්‍රමාණය',
            PRICE: 'මිල',
            'There are no compatible supply and demand records to allocate.': 'වෙන් කිරීමට ගැළපෙන සැපයුම් සහ ඉල්ලුම් වාර්තා නැත.',
            'This is a suggested plan, not a confirmed order. Run it again after changing supply or demand.': 'මෙය යෝජිත සැලැස්මක් මිස තහවුරු කළ ඇණවුමක් නොවේ. සැපයුම හෝ ඉල්ලුම වෙනස් කළ පසු නැවත ක්‍රියාත්මක කරන්න.',
            'No open buyer demand.': 'විවෘත ගැනුම්කරු ඉල්ලීම් නැත.',
            'No eligible matches. Add compatible supply or demand.': 'සුදුසු ගැළපීම් නැත. ගැළපෙන සැපයුමක් හෝ ඉල්ලුමක් එක් කරන්න.',
            'No farmers match your search.': 'ඔබගේ සෙවුමට ගැළපෙන ගොවීන් නැත.',
            'No farmers have been added.': 'තවම ගොවීන් එක් කර නැත.',
            'No buyer requests match your search.': 'ඔබගේ සෙවුමට ගැළපෙන ගැනුම්කරු ඉල්ලීම් නැත.',
            'No buyer requests have been added.': 'තවම ගැනුම්කරු ඉල්ලීම් එක් කර නැත.',
            'Available': 'ලබාගත හැකිය',
            'Sold out': 'විකිණී අවසන්',
            Open: 'විවෘතයි',
            Fulfilled: 'සපුරා ඇත',
            'Mark as sold': 'විකුණූ ලෙස සලකුණු කරන්න',
            Saving: 'සුරකිමින්',
            Sold: 'විකිණුවා',
            'Change role': 'භූමිකාව වෙනස් කරන්න',
            'Sign out': 'ඉවත් වන්න',
            'Switch to light mode': 'ආලෝක ප්‍රකාරයට මාරු වන්න',
            'Switch to dark mode': 'අඳුරු ප්‍රකාරයට මාරු වන්න',
            'Light mode': 'ආලෝක ප්‍රකාරය',
            'Dark mode': 'අඳුරු ප්‍රකාරය',
            'CROPLINK WORKSPACE': 'CROPLINK වැඩබිම',
            'Sign in to your workspace': 'ඔබගේ වැඩබිමට පුරනය වන්න',
            'Select your role and use your Firebase account.': 'ඔබගේ භූමිකාව තෝරා Firebase ගිණුම භාවිතා කරන්න.',
            'Login as': 'ලෙස පුරනය වන්න',
            Farmer: 'ගොවියා',
            Buyer: 'ගැනුම්කරු',
            'Email address': 'විද්‍යුත් තැපැල් ලිපිනය',
            Password: 'මුරපදය',
            'Enter your password': 'ඔබගේ මුරපදය ඇතුළත් කරන්න',
            Show: 'පෙන්වන්න',
            Hide: 'සඟවන්න',
            'Sign in': 'පුරනය වන්න',
            'Create your workspace account': 'ඔබගේ වැඩබිම් ගිණුම සාදන්න',
            'Create an account with your email address and a password.': 'විද්‍යුත් තැපැල් ලිපිනයක් සහ මුරපදයක් භාවිතා කර ගිණුමක් සාදන්න.',
            'Create account': 'ගිණුම සාදන්න',
            'Already have an account? Sign in': 'දැනටමත් ගිණුමක් තිබේද? පුරනය වන්න',
            'New here? Create an account': 'අලුත්ද? ගිණුමක් සාදන්න',
            'Sign-in failed:': 'පුරනය වීම අසාර්ථකයි:',
            'Account creation failed:': 'ගිණුම සෑදීම අසාර්ථකයි:',
            'Enter a name, product, location, and positive quantity and price.': 'නම, නිෂ්පාදනය, ස්ථානය, ශූන්‍යයට වැඩි ප්‍රමාණයක් සහ මිලක් ඇතුළත් කරන්න.',
            'Sign in before saving records.': 'වාර්තා සුරැකීමට පෙර පුරනය වන්න.',
            'Could not save this record:': 'මෙම වාර්තාව සුරැකීමට නොහැකි විය:',
            'Authentication error:': 'සත්‍යාපන දෝෂය:',
            'Firestore setup failed:': 'Firestore සැකසුම අසාර්ථකයි:',
            'Could not load buyer requests:': 'ගැනුම්කරු ඉල්ලීම් පූරණය කළ නොහැකි විය:',
            'Could not sign out:': 'ඉවත් වීමට නොහැකි විය:',
            'Could not switch role:': 'භූමිකාව මාරු කිරීමට නොහැකි විය:',
            'This allocation is out of date. Wait for the data to refresh, then try again.': 'මෙම වෙන්කිරීම යාවත්කාලීන නොවේ. දත්ත යාවත්කාලීන වන තෙක් සිට නැවත උත්සාහ කරන්න.',
            'Confirm sale of': 'විකිණීම තහවුරු කරන්න:',
            "This will reduce both farmer stock and the buyer's remaining request.": 'මෙයින් ගොවි තොගය සහ ගැනුම්කරුගේ ඉතිරි ඉල්ලීම දෙකම අඩු වේ.',
            'Sale recorded:': 'විකිණීම සටහන් කළා:',
            'Farmer stock and buyer demand have been updated.': 'ගොවි තොගය සහ ගැනුම්කරු ඉල්ලුම යාවත්කාලීන කර ඇත.',
            'Could not record this sale:': 'මෙම විකිණීම සටහන් කළ නොහැකි විය:',
            'No eligible route is available.': 'සුදුසු මාර්ගයක් නොමැත.',
            'OpenStreetMap road segments': 'OpenStreetMap මාර්ග කොටස්',
            'Route distance:': 'මාර්ග දුර:',
            'This is the shortest option returned by the online router, but may not be the shortest possible route.': 'මාර්ග සේවාව ලබාදුන් කෙටිම විකල්පය මෙයයි; එහෙත් හැකි කෙටිම මාර්ගය නොවිය හැකිය.',
            '. This is the shortest option returned by the online router, but may not be the shortest possible route.': ' මාර්ග සේවාව ලබාදුන් කෙටිම විකල්පය මෙයයි; එහෙත් හැකි කෙටිම මාර්ගය නොවිය හැකිය.',
            'Online route comparison failed; other match distances may use local estimates.': 'මාර්ග සැසඳීම අසාර්ථක විය; අනෙක් ගැළපීම්වල දුර දේශීය ඇස්තමේන්තු විය හැකිය.',
            'Item': 'අයිතමය',
            'Matched quantity': 'ගැළපූ ප්‍රමාණය',
            'Farmer price': 'ගොවි මිල',
            'Estimated total cost': 'ඇස්තමේන්තුගත මුළු පිරිවැය',
            'Buyer maximum total': 'ගැනුම්කරුගේ උපරිම එකතුව',
            'Below buyer maximum': 'ගැනුම්කරුගේ උපරිමයට වඩා අඩු',
            'Calculated for the smaller of available supply and requested quantity.': 'ලබාගත හැකි සැපයුම සහ ඉල්ලා ඇති ප්‍රමාණය අතර කුඩා අගය අනුව ගණනය කර ඇත.',
            "No farmer currently meets this request's product and price requirements.": 'දැනට මෙම ඉල්ලීමේ නිෂ්පාදන සහ මිල අවශ්‍යතා සපුරන ගොවියෙකු නැත.',
            'This request is fulfilled; no quantity is left to match.': 'මෙම ඉල්ලීම සපුරා ඇත; ගැළපීමට ප්‍රමාණයක් ඉතිරිව නැත.',
            'Remaining quantity': 'ඉතිරි ප්‍රමාණය',
            'Maximum price': 'උපරිම මිල',
            'Maximum total': 'උපරිම එකතුව',
            'Delivery location': 'බෙදාහැරීමේ ස්ථානය',
            'Potential farmer matches': 'හැකි ගොවි ගැළපීම්',
            'Suggestions only; these are not confirmed sales.': 'මේවා යෝජනා පමණි; තහවුරු කළ විකිණීම් නොවේ.',
            'Here to help': 'උදව් කිරීමට සූදානම්',
            'Ask in Sinhala, English, or Singlish': 'සිංහල, English හෝ Singlish වලින් අසන්න',
            'Ask anything...': 'ඕනෑම දෙයක් අසන්න...',
            'Ask anything in Sinhala, English, or Singlish': 'සිංහල, English හෝ Singlish වලින් ඕනෑම දෙයක් අසන්න',
            'Send message': 'පණිවිඩය යවන්න',
            'Thinking...': 'සිතමින්...',
            'Sign in to use the AI assistant.': 'AI සහායකය භාවිතා කිරීමට පුරනය වන්න.',
            'The AI assistant could not answer right now.': 'AI සහායකයාට මේ මොහොතේ පිළිතුරු දිය නොහැක.',
            'The AI assistant returned an empty response.': 'AI සහායකයා හිස් පිළිතුරක් ලබා දුන්නේය.',
            'Your session is invalid. Sign in again.': 'ඔබගේ සැසිය වලංගු නැත. නැවත පුරනය වන්න.',
            "You have reached today's AI assistant limit. Try again tomorrow.": 'අද AI සහායක භාවිත සීමාවට ඔබ ළඟා වී ඇත. හෙට නැවත උත්සාහ කරන්න.',
            'The AI assistant is temporarily unavailable. Please try again.': 'AI සහායකයා තාවකාලිකව ලබාගත නොහැක. නැවත උත්සාහ කරන්න.',
            'Hi! Ask me anything in Sinhala, English, or Singlish. I can help with CropLink and other questions.': 'ආයුබෝවන්! සිංහල, English හෝ Singlish වලින් ඕනෑම දෙයක් අසන්න. CropLink සහ වෙනත් ප්‍රශ්නවලට උදව් කරන්නම්.',
            'Hi! I can help you use CropLink. What would you like to know?': 'ආයුබෝවන්! CropLink භාවිතා කිරීමට උදව් කරන්නම්. ඔබ දැනගැනීමට කැමති කුමක්ද?',
            'Ask a question...': 'ප්‍රශ්නයක් අසන්න...',
            'Ask a question': 'ප්‍රශ්නයක් අසන්න',
            'Ask AI': 'AIගෙන් අසන්න',
            'How do I add a farmer?': 'ගොවියෙකු එක් කරන්නේ කෙසේද?',
            'How are matches calculated?': 'ගැළපීම් ගණනය කරන්නේ කෙසේද?',
            'Open CropLink AI assistant': 'CropLink AI සහායකය විවෘත කරන්න',
            Send: 'යවන්න',
            'CropLink support assistant': 'CropLink සහායකය',
            'CropLink Assistant': 'CropLink සහායකය',
            'CropLink AI Chatbot': 'CropLink AI කතාබහ',
            'Close assistant': 'සහායකය වසන්න',
            'Close sign-in': 'පුරනය වීමේ කවුළුව වසන්න',
            'Open profile menu': 'පැතිකඩ මෙනුව විවෘත කරන්න',
            'View details for': 'විස්තර බලන්න:',
            'Show password': 'මුරපදය පෙන්වන්න',
            'Hide password': 'මුරපදය සඟවන්න',
            'Main navigation': 'ප්‍රධාන සංචාලනය',
            'Network overview': 'ජාල සාරාංශය',
            'Monthly harvest volume trends in kilograms': 'කිලෝග්‍රෑම්වලින් මාසික අස්වනු ප්‍රවණතා',
            'Chart.js could not load. Check your internet connection.': 'Chart.js පූරණය කළ නොහැකි විය. අන්තර්ජාල සම්බන්ධතාව පරීක්ෂා කරන්න.',
            'Loading road details from OpenStreetMap...': 'OpenStreetMap වෙතින් මාර්ග විස්තර පූරණය වෙමින් පවතී...',
            'Ask a question about using CropLink.': 'CropLink භාවිතය ගැන ප්‍රශ්නයක් අසන්න.',
            'Request details': 'ඉල්ලීමේ විස්තර',
            'Supplier · ': 'සැපයුම්කරු · ',
            'Buyer · ': 'ගැනුම්කරු · ',
            'No open buyer demand.': 'විවෘත ගැනුම්කරු ඉල්ලීම් නැත.',
            Jan: 'ජන',
            Feb: 'පෙබ',
            Mar: 'මාර්',
            Apr: 'අප්‍රේ',
            May: 'මැයි',
            Jun: 'ජූනි',
            Jul: 'ජූලි',
            Aug: 'අගෝ',
            Sep: 'සැප්',
            Oct: 'ඔක්',
            Nov: 'නොවැ',
            Dec: 'දෙසැ'
        },
        ta: {
            'CropLink | Dashboard': 'CropLink | முகப்புப் பலகை',
            'CropLink | Farmers': 'CropLink | விவசாயிகள்',
            'CropLink | Buyer demand': 'CropLink | வாங்குநர் தேவை',
            'CropLink | Smart matches': 'CropLink | சிறந்த பொருத்தங்கள்',
            'CropLink | Allocations': 'CropLink | ஒதுக்கீடுகள்',
            Language: 'மொழி',
            'Choose language': 'மொழியைத் தேர்ந்தெடுக்கவும்',
            'SUPPLY COORDINATION': 'வழங்கல் ஒருங்கிணைப்பு',
            WORKSPACE: 'பணியிடம்',
            Dashboard: 'முகப்புப் பலகை',
            Farmers: 'விவசாயிகள்',
            'Buyer demand': 'வாங்குநர் தேவை',
            'Smart matches': 'சிறந்த பொருத்தங்கள்',
            Allocations: 'ஒதுக்கீடுகள்',
            'Need help?': 'உதவி தேவையா?',
            'Ask a question about using CropLink.': 'CropLink பயன்பாடு பற்றி கேளுங்கள்.',
            'Ask a question about managing farmer supplies.': 'விவசாயிகளின் வழங்கலை நிர்வகிப்பது பற்றி கேளுங்கள்.',
            'Ask a question about buyer requests and matching.': 'வாங்குநர் கோரிக்கைகள் மற்றும் பொருத்தங்கள் பற்றி கேளுங்கள்.',
            'Ask how CropLink finds suitable farmer and buyer pairs.': 'பொருத்தமான விவசாயி-வாங்குநர் இணைகளை CropLink எவ்வாறு கண்டறிகிறது எனக் கேளுங்கள்.',
            'See how CropLink plans fair supply allocations.': 'நியாயமான வழங்கல் ஒதுக்கீடுகளை CropLink எவ்வாறு திட்டமிடுகிறது எனப் பாருங்கள்.',
            'CropLink Demo': 'CropLink மாதிரி',
            'e.g. Nimal Perera': 'எ.கா. Nimal Perera',
            'e.g. FreshMart': 'எ.கா. FreshMart',
            Status: 'நிலை',
            Coordinator: 'ஒருங்கிணைப்பாளர்',
            More: 'மேலும்',
            Workspace: 'பணியிடம்',
            'Demo data active': 'மாதிரி தரவு செயலில் உள்ளது',
            Notifications: 'அறிவிப்புகள்',
            'Network status': 'வலையமைப்பு நிலை',
            'No new activity': 'புதிய செயல்பாடு இல்லை',
            'Sign-in required': 'உள்நுழைய வேண்டும்',
            'Firebase connected': 'Firebase இணைக்கப்பட்டது',
            'Good morning': 'காலை வணக்கம்',
            'Good afternoon': 'மதிய வணக்கம்',
            'Good evening': 'மாலை வணக்கம்',
            'Good night': 'இரவு வணக்கம்',
            ', Coordinator': ', ஒருங்கிணைப்பாளர்',
            'Here’s a quick look at your supply network today.': 'இன்றைய உங்கள் வழங்கல் வலையமைப்பின் சுருக்கம்.',
            'Find matches': 'பொருத்தங்களைக் கண்டறியவும்',
            'Active farmers': 'செயலில் உள்ள விவசாயிகள்',
            'Buyer requests': 'வாங்குநர் கோரிக்கைகள்',
            'Potential matches': 'சாத்தியமான பொருத்தங்கள்',
            'Available supply': 'கிடைக்கும் வழங்கல்',
            'Ready to supply': 'வழங்கத் தயார்',
            'Across multiple crops': 'பல பயிர்களில்',
            'Based on price and distance': 'விலை மற்றும் தூரத்தின் அடிப்படையில்',
            'Across all listed produce': 'பட்டியலிடப்பட்ட அனைத்து விளைபொருட்களும்',
            'Harvest volume trends': 'அறுவடை அளவு மாற்றங்கள்',
            'Monthly harvest volume across the network': 'வலையமைப்பின் மாதாந்திர அறுவடை அளவு',
            'Harvest volume': 'அறுவடை அளவு',
            'Illustrative demo data': 'மாதிரி விளக்கத் தரவு',
            'Demand by crop': 'பயிர் வாரியான தேவை',
            'Requested quantities': 'கோரப்பட்ட அளவுகள்',
            'View buyer requests': 'வாங்குநர் கோரிக்கைகளைப் பார்க்கவும்',
            'Top recommended matches': 'சிறந்த பரிந்துரைக்கப்பட்ட பொருத்தங்கள்',
            'Farmer and buyer combinations that best fit': 'சிறப்பாகப் பொருந்தும் விவசாயி மற்றும் வாங்குநர் இணைகள்',
            'See all matches': 'அனைத்து பொருத்தங்களையும் பார்க்கவும்',
            'Recommended match details': 'பரிந்துரைக்கப்பட்ட பொருத்த விவரங்கள்',
            'View details': 'விவரங்களைப் பார்க்கவும்',
            Farmer: 'விவசாயி',
            Buyer: 'வாங்குநர்',
            'Farmer location': 'விவசாயியின் இடம்',
            'Buyer location': 'வாங்குநரின் இடம்',
            'Buyer maximum price': 'வாங்குநரின் அதிகபட்ச விலை',
            Distance: 'தூரம்',
            'Suitability score': 'பொருத்த மதிப்பெண்',
            'Price fit (35%)': 'விலைப் பொருத்தம் (35%)',
            'Distance fit (45%)': 'தூரப் பொருத்தம் (45%)',
            'Supply coverage (20%)': 'வழங்கல் அளவு பொருத்தம் (20%)',
            'Potential savings': 'சாத்தியமான சேமிப்பு',
            FARMER: 'விவசாயி',
            PRODUCT: 'விளைபொருள்',
            BUYER: 'வாங்குநர்',
            QUANTITY: 'அளவு',
            DISTANCE: 'தூரம்',
            SUITABILITY: 'பொருத்தம்',
            'CropLink demo. Please confirm availability, prices, and delivery details with each participant.': 'இது CropLink மாதிரி. கிடைக்கும் நிலை, விலை மற்றும் விநியோக விவரங்களை சம்பந்தப்பட்டவர்களிடம் உறுதிப்படுத்தவும்.',
            'SUPPLY NETWORK': 'வழங்கல் வலையமைப்பு',
            'See who is supplying produce, where they are, and how much is available.': 'யார் விளைபொருட்களை வழங்குகிறார்கள், அவர்கள் எங்குள்ளனர், எவ்வளவு கிடைக்கிறது என்பதைப் பாருங்கள்.',
            'Add farmer': 'விவசாயியைச் சேர்க்கவும்',
            'Registered farmers': 'பதிவுசெய்த விவசாயிகள்',
            'Across 10 growing regions': '10 விவசாயப் பகுதிகளில்',
            'Produce available': 'கிடைக்கும் விளைபொருட்கள்',
            'Total listed supply': 'பட்டியலிட்ட மொத்த வழங்கல்',
            'Crop varieties': 'பயிர் வகைகள்',
            'Products in the network': 'வலையமைப்பில் உள்ள விளைபொருட்கள்',
            'Farmer directory': 'விவசாயி பட்டியல்',
            'Available supply, asking price, and farm location': 'கிடைக்கும் வழங்கல், கேட்கும் விலை மற்றும் பண்ணை இடம்',
            'Search farmers or crops': 'விவசாயிகள் அல்லது பயிர்களைத் தேடவும்',
            AVAILABLE: 'கிடைக்கும்',
            'ASKING PRICE': 'கேட்கும் விலை',
            LOCATION: 'இடம்',
            STATUS: 'நிலை',
            'Your farmer records are saved to your account.': 'உங்கள் விவசாயி பதிவுகள் கணக்கில் சேமிக்கப்படும்.',
            'NEW SUPPLIER': 'புதிய வழங்குநர்',
            'Add a farmer': 'விவசாயியைச் சேர்க்கவும்',
            Close: 'மூடு',
            'Farmer name': 'விவசாயியின் பெயர்',
            Product: 'விளைபொருள்',
            'Select a crop': 'பயிரைத் தேர்ந்தெடுக்கவும்',
            'Other (type a crop)': 'மற்றவை (பயிரின் பெயரை உள்ளிடவும்)',
            'Enter crop name': 'பயிரின் பெயரை உள்ளிடவும்',
            Rice: 'அரிசி',
            Tomato: 'தக்காளி',
            Potato: 'உருளைக்கிழங்கு',
            Onion: 'வெங்காயம்',
            Carrot: 'கேரட்',
            Banana: 'வாழைப்பழம்',
            Chili: 'மிளகாய்',
            Cabbage: 'முட்டைக்கோஸ்',
            Pumpkin: 'பூசணிக்காய்',
            Papaya: 'பப்பாளி',
            'Switch to Coordinator or Farmer role to add a farmer.': 'விவசாயியைச் சேர்க்க ஒருங்கிணைப்பாளர் அல்லது விவசாயி பங்கிற்கு மாறவும்.',
            'Available quantity (kg)': 'கிடைக்கும் அளவு (கி.கி.)',
            'Asking price (LKR / kg)': 'கேட்கும் விலை (ரூ. / கி.கி.)',
            Location: 'இடம்',
            'Select a location': 'இடத்தைத் தேர்ந்தெடுக்கவும்',
            'Adding more of the same crop for the same farmer updates the existing supply total.': 'அதே விவசாயிக்கு அதே பயிரை மீண்டும் சேர்த்தால் மொத்த வழங்கல் புதுப்பிக்கப்படும்.',
            Cancel: 'ரத்துசெய்',
            'Save farmer': 'விவசாயியைச் சேமிக்கவும்',
            'MARKET DEMAND': 'சந்தைத் தேவை',
            'Buyer requests': 'வாங்குநர் கோரிக்கைகள்',
            'Keep track of what buyers need, how much they want, and their target price.': 'வாங்குநர்களின் தேவை, அளவு மற்றும் இலக்கு விலையைப் பின்தொடரவும்.',
            'Add buyer request': 'வாங்குநர் கோரிக்கையைச் சேர்க்கவும்',
            'Open requests': 'திறந்த கோரிக்கைகள்',
            'Active buyer requirements': 'செயலில் உள்ள வாங்குநர் தேவைகள்',
            'Demand volume': 'தேவை அளவு',
            'Combined requested quantity': 'மொத்தமாகக் கோரப்பட்ட அளவு',
            'Average target price': 'சராசரி இலக்கு விலை',
            'Across all buyer requests': 'அனைத்து வாங்குநர் கோரிக்கைகளிலும்',
            'Buyer request board': 'வாங்குநர் கோரிக்கை பலகை',
            'Buyer requests matched against available farmer supply': 'கிடைக்கும் விவசாயி வழங்கலுடன் பொருத்தப்பட்ட வாங்குநர் கோரிக்கைகள்',
            'Search buyers or crops': 'வாங்குநர்கள் அல்லது பயிர்களைத் தேடவும்',
            'QUANTITY NEEDED': 'தேவையான அளவு',
            'MAX PRICE': 'அதிகபட்ச விலை',
            'DELIVERY LOCATION': 'விநியோக இடம்',
            'Your buyer requests are saved to your account.': 'உங்கள் வாங்குநர் கோரிக்கைகள் கணக்கில் சேமிக்கப்படும்.',
            'NEW DEMAND': 'புதிய தேவை',
            'Add a buyer request': 'வாங்குநர் கோரிக்கையைச் சேர்க்கவும்',
            'Buyer / business name': 'வாங்குநர் / நிறுவனத்தின் பெயர்',
            'Quantity needed (kg)': 'தேவையான அளவு (கி.கி.)',
            'Maximum price (LKR / kg)': 'அதிகபட்ச விலை (ரூ. / கி.கி.)',
            'Save request': 'கோரிக்கையைச் சேமிக்கவும்',
            'BUYER REQUEST': 'வாங்குநர் கோரிக்கை',
            'Request details': 'கோரிக்கை விவரங்கள்',
            'Close request details': 'கோரிக்கை விவரங்களை மூடு',
            'RECOMMENDATIONS': 'பரிந்துரைகள்',
            'See which farmers best fit each buyer request and why.': 'ஒவ்வொரு வாங்குநர் கோரிக்கைக்கும் மிகவும் பொருத்தமான விவசாயிகளையும் காரணத்தையும் பாருங்கள்.',
            'Refresh matches': 'பொருத்தங்களைப் புதுப்பிக்கவும்',
            'How we rank matches': 'பொருத்தங்களை வரிசைப்படுத்தும் முறை',
            'We first check that the crop fits and the price is within the buyer’s budget. Then we score price fit (35%), distance (45%), and available supply (20%).': 'முதலில் பயிர் பொருந்துகிறதா, விலை வாங்குநரின் வரம்புக்குள் உள்ளதா எனச் சரிபார்க்கிறோம். பின்னர் விலைப் பொருத்தம் (35%), தூரம் (45%), கிடைக்கும் வழங்கல் (20%) ஆகியவற்றின் அடிப்படையில் மதிப்பிடுகிறோம்.',
            'Eligible matches': 'தகுதியான பொருத்தங்கள்',
            'Same crop and within budget': 'அதே பயிர் மற்றும் வரம்புக்குள்',
            'Strong matches': 'வலுவான பொருத்தங்கள்',
            'Suitability score 75% or higher': 'பொருத்த மதிப்பெண் 75% அல்லது அதிகம்',
            'Products matched': 'பொருத்தப்பட்ட பயிர்கள்',
            'Different crops requested': 'கோரப்பட்ட வெவ்வேறு பயிர்கள்',
            'Recommended matches': 'பரிந்துரைக்கப்பட்ட பொருத்தங்கள்',
            'Best fit appears first.': 'மிகச் சிறந்த பொருத்தம் முதலில் காட்டப்படும்.',
            'Search farmer, buyer, or crop': 'விவசாயி, வாங்குநர் அல்லது பயிரைத் தேடவும்',
            RANK: 'தரவரிசை',
            'FARMER TO BUYER': 'விவசாயி முதல் வாங்குநர் வரை',
            'PRICE FIT': 'விலைப் பொருத்தம்',
            'No eligible matches yet. Add compatible farmer supply or buyer requests to get started.': 'இன்னும் தகுதியான பொருத்தங்கள் இல்லை. தொடங்க பொருத்தமான விவசாயி வழங்கல் அல்லது வாங்குநர் கோரிக்கைகளைச் சேர்க்கவும்.',
            'Sri Lanka road route map': 'இலங்கை சாலை வழித்தட வரைபடம்',
            'Select a match to load an OpenStreetMap driving route.': 'OpenStreetMap ஓட்டுநர் வழித்தடத்தைப் பெற ஒரு பொருத்தத்தைத் தேர்ந்தெடுக்கவும்.',
            Route: 'வழித்தடம்',
            'Select a match': 'ஒரு பொருத்தத்தைத் தேர்ந்தெடுக்கவும்',
            'Map showing an OpenStreetMap driving route in Sri Lanka': 'இலங்கையில் OpenStreetMap ஓட்டுநர் வழித்தடத்தைக் காட்டும் வரைபடம்',
            'Matched item quantity and price': 'பொருத்தப்பட்ட பொருளின் அளவு மற்றும் விலை',
            'Zoom in': 'பெரிதாக்கு',
            'Zoom out': 'சிறிதாக்கு',
            'Town and road route details': 'நகர மற்றும் சாலை வழித்தட விவரங்கள்',
            'Towns and roads on the online route': 'இணைய வழித்தடத்தில் உள்ள நகரங்களும் சாலைகளும்',
            'Item quantity & price estimate': 'பொருள் அளவு மற்றும் விலை மதிப்பீடு',
            'Select a match to load its online road route.': 'இணைய சாலை வழித்தடத்தைப் பெற ஒரு பொருத்தத்தைத் தேர்ந்தெடுக்கவும்.',
            'Select a match to see quantity and price estimates.': 'அளவு மற்றும் விலை மதிப்பீடுகளைப் பார்க்க ஒரு பொருத்தத்தைத் தேர்ந்தெடுக்கவும்.',
            'Recommendations are decision support. Confirm quality, availability, and delivery terms directly.': 'பரிந்துரைகள் முடிவெடுக்க உதவுபவை. தரம், கிடைக்கும் நிலை மற்றும் விநியோக நிபந்தனைகளை நேரடியாக உறுதிப்படுத்தவும்.',
            'SUPPLY PLANNING': 'வழங்கல் திட்டமிடல்',
            'Product allocation': 'விளைபொருள் ஒதுக்கீடு',
            'Plan how available farmer supply can meet buyer requests.': 'கிடைக்கும் விவசாயி வழங்கல் மூலம் வாங்குநர் கோரிக்கைகளை நிறைவேற்றத் திட்டமிடவும்.',
            'Run allocation': 'ஒதுக்கீட்டைச் செயல்படுத்தவும்',
            'How allocations work': 'ஒதுக்கீடுகள் செயல்படும் விதம்',
            "CropLink starts with the strongest eligible matches and assigns supply until each buyer request or farmer's listed quantity is filled. It will not allocate more than a farmer has available. After a sale is completed, select Mark as sold to update both quantities.": 'CropLink சிறந்த தகுதியான பொருத்தங்களில் தொடங்கி, வாங்குநர் கோரிக்கை அல்லது விவசாயியின் பட்டியலிடப்பட்ட அளவு நிறையும் வரை வழங்கலை ஒதுக்குகிறது. விவசாயியிடம் இருப்பதைவிட அதிகமாக ஒதுக்காது. விற்பனை முடிந்ததும் இரு அளவுகளையும் புதுப்பிக்க “விற்றதாகக் குறிக்கவும்” என்பதைத் தேர்ந்தெடுக்கவும்.',
            Allocated: 'ஒதுக்கப்பட்டது',
            'Of compatible demand': 'பொருந்தக்கூடிய தேவையில்',
            'Unfilled demand': 'நிறைவேற்றப்படாத தேவை',
            'Demand remaining after allocation': 'ஒதுக்கீட்டிற்குப் பின் மீதமுள்ள தேவை',
            'Fulfilled requests': 'நிறைவேற்றப்பட்ட கோரிக்கைகள்',
            'Buyer requests fully supplied': 'முழுமையாக வழங்கப்பட்ட வாங்குநர் கோரிக்கைகள்',
            'Suggested allocation plan': 'பரிந்துரைக்கப்பட்ட ஒதுக்கீட்டுத் திட்டம்',
            'A buyer request can be supplied by more than one farm.': 'ஒரு வாங்குநர் கோரிக்கையை ஒன்றுக்கும் மேற்பட்ட பண்ணைகள் வழங்கலாம்.',
            'Ready to review': 'மதிப்பாய்வுக்குத் தயார்',
            SALE: 'விற்பனை',
            ALLOCATED: 'ஒதுக்கப்பட்டது',
            PRICE: 'விலை',
            'There are no compatible supply and demand records to allocate.': 'ஒதுக்குவதற்கு பொருந்தக்கூடிய வழங்கல் மற்றும் தேவை பதிவுகள் இல்லை.',
            'This is a suggested plan, not a confirmed order. Run it again after changing supply or demand.': 'இது பரிந்துரைக்கப்பட்ட திட்டம் மட்டுமே; உறுதிசெய்யப்பட்ட ஆர்டர் அல்ல. வழங்கல் அல்லது தேவை மாறியபின் மீண்டும் செயல்படுத்தவும்.',
            'No open buyer demand.': 'திறந்த வாங்குநர் கோரிக்கைகள் இல்லை.',
            'No eligible matches. Add compatible supply or demand.': 'தகுதியான பொருத்தங்கள் இல்லை. பொருத்தமான வழங்கல் அல்லது தேவையைச் சேர்க்கவும்.',
            'No farmers match your search.': 'உங்கள் தேடலுக்கு விவசாயிகள் பொருந்தவில்லை.',
            'No farmers have been added.': 'விவசாயிகள் இன்னும் சேர்க்கப்படவில்லை.',
            'No buyer requests match your search.': 'உங்கள் தேடலுக்கு வாங்குநர் கோரிக்கைகள் பொருந்தவில்லை.',
            'No buyer requests have been added.': 'வாங்குநர் கோரிக்கைகள் இன்னும் சேர்க்கப்படவில்லை.',
            'Available': 'கிடைக்கிறது',
            'Sold out': 'விற்றுத் தீர்ந்தது',
            Open: 'திறந்தது',
            Fulfilled: 'நிறைவேற்றப்பட்டது',
            'Mark as sold': 'விற்றதாகக் குறிக்கவும்',
            Saving: 'சேமிக்கிறது',
            Sold: 'விற்கப்பட்டது',
            'Change role': 'பாத்திரத்தை மாற்றவும்',
            'Sign out': 'வெளியேறவும்',
            'Switch to light mode': 'ஒளி பயன்முறைக்கு மாறவும்',
            'Switch to dark mode': 'இருள் பயன்முறைக்கு மாறவும்',
            'Light mode': 'ஒளி பயன்முறை',
            'Dark mode': 'இருள் பயன்முறை',
            'CROPLINK WORKSPACE': 'CROPLINK பணியிடம்',
            'Sign in to your workspace': 'உங்கள் பணியிடத்தில் உள்நுழையவும்',
            'Select your role and use your Firebase account.': 'உங்கள் பாத்திரத்தைத் தேர்ந்தெடுத்து Firebase கணக்கைப் பயன்படுத்தவும்.',
            'Login as': 'இவ்வாறு உள்நுழையவும்',
            Farmer: 'விவசாயி',
            Buyer: 'வாங்குநர்',
            'Email address': 'மின்னஞ்சல் முகவரி',
            Password: 'கடவுச்சொல்',
            'Enter your password': 'கடவுச்சொல்லை உள்ளிடவும்',
            Show: 'காட்டு',
            Hide: 'மறை',
            'Sign in': 'உள்நுழைக',
            'Create your workspace account': 'பணியிடக் கணக்கை உருவாக்கவும்',
            'Create an account with your email address and a password.': 'மின்னஞ்சல் முகவரி மற்றும் கடவுச்சொல்லுடன் கணக்கை உருவாக்கவும்.',
            'Create account': 'கணக்கை உருவாக்கவும்',
            'Already have an account? Sign in': 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக',
            'New here? Create an account': 'புதியவரா? கணக்கை உருவாக்கவும்',
            'Sign-in failed:': 'உள்நுழைவு தோல்வியடைந்தது:',
            'Account creation failed:': 'கணக்கு உருவாக்கம் தோல்வியடைந்தது:',
            'Enter a name, product, location, and positive quantity and price.': 'பெயர், விளைபொருள், இடம், பூஜ்ஜியத்தை விட அதிகமான அளவு மற்றும் விலையை உள்ளிடவும்.',
            'Sign in before saving records.': 'பதிவுகளைச் சேமிப்பதற்கு முன் உள்நுழையவும்.',
            'Could not save this record:': 'இந்தப் பதிவைச் சேமிக்க முடியவில்லை:',
            'Authentication error:': 'அங்கீகாரப் பிழை:',
            'Firestore setup failed:': 'Firestore அமைப்பு தோல்வியடைந்தது:',
            'Could not load buyer requests:': 'வாங்குநர் கோரிக்கைகளை ஏற்ற முடியவில்லை:',
            'Could not sign out:': 'வெளியேற முடியவில்லை:',
            'Could not switch role:': 'பாத்திரத்தை மாற்ற முடியவில்லை:',
            'This allocation is out of date. Wait for the data to refresh, then try again.': 'இந்த ஒதுக்கீடு காலாவதியானது. தரவு புதுப்பிக்கப்படும் வரை காத்திருந்து மீண்டும் முயற்சிக்கவும்.',
            'Confirm sale of': 'விற்பனையை உறுதிப்படுத்தவும்:',
            "This will reduce both farmer stock and the buyer's remaining request.": 'இதனால் விவசாயியின் இருப்பும் வாங்குநரின் மீதமுள்ள கோரிக்கையும் குறையும்.',
            'Sale recorded:': 'விற்பனை பதிவு செய்யப்பட்டது:',
            'Farmer stock and buyer demand have been updated.': 'விவசாயியின் இருப்பும் வாங்குநரின் தேவையும் புதுப்பிக்கப்பட்டன.',
            'Could not record this sale:': 'இந்த விற்பனையைப் பதிவு செய்ய முடியவில்லை:',
            'No eligible route is available.': 'தகுதியான வழித்தடம் இல்லை.',
            'OpenStreetMap road segments': 'OpenStreetMap சாலைப் பகுதிகள்',
            'Route distance:': 'வழித்தடத் தூரம்:',
            'This is the shortest option returned by the online router, but may not be the shortest possible route.': 'இணைய வழித்தட சேவை வழங்கிய குறுகிய விருப்பம் இதுவாகும்; இதுவே சாத்தியமான மிகக் குறுகிய வழி என உறுதியில்லை.',
            '. This is the shortest option returned by the online router, but may not be the shortest possible route.': ' இணைய வழித்தட சேவை வழங்கிய குறுகிய விருப்பம் இதுவாகும்; இதுவே சாத்தியமான மிகக் குறுகிய வழி என உறுதியில்லை.',
            'Online route comparison failed; other match distances may use local estimates.': 'இணைய வழித்தட ஒப்பீடு தோல்வியடைந்தது; பிற பொருத்தத் தூரங்கள் உள்ளூர் மதிப்பீடுகளாக இருக்கலாம்.',
            Item: 'பொருள்',
            'Matched quantity': 'பொருத்தப்பட்ட அளவு',
            'Farmer price': 'விவசாயி விலை',
            'Estimated total cost': 'மதிப்பிடப்பட்ட மொத்தச் செலவு',
            'Buyer maximum total': 'வாங்குநரின் அதிகபட்ச மொத்தம்',
            'Below buyer maximum': 'வாங்குநரின் அதிகபட்சத்தைவிடக் குறைவு',
            'Calculated for the smaller of available supply and requested quantity.': 'கிடைக்கும் வழங்கல் அல்லது கோரப்பட்ட அளவு இவற்றில் குறைவானதைப் பயன்படுத்திக் கணக்கிடப்பட்டது.',
            "No farmer currently meets this request's product and price requirements.": 'இந்தக் கோரிக்கையின் விளைபொருள் மற்றும் விலைத் தேவைகளைப் பூர்த்தி செய்யும் விவசாயி தற்போது இல்லை.',
            'This request is fulfilled; no quantity is left to match.': 'இந்தக் கோரிக்கை நிறைவேற்றப்பட்டது; பொருத்துவதற்கு அளவு எதுவும் மீதமில்லை.',
            'Remaining quantity': 'மீதமுள்ள அளவு',
            'Maximum price': 'அதிகபட்ச விலை',
            'Maximum total': 'அதிகபட்ச மொத்தம்',
            'Delivery location': 'விநியோக இடம்',
            'Potential farmer matches': 'சாத்தியமான விவசாயி பொருத்தங்கள்',
            'Suggestions only; these are not confirmed sales.': 'இவை பரிந்துரைகள் மட்டுமே; உறுதிசெய்யப்பட்ட விற்பனைகள் அல்ல.',
            'Here to help': 'உதவத் தயார்',
            'Ask in Sinhala, English, or Singlish': 'சிங்களம், ஆங்கிலம் அல்லது சிங்லிஷில் கேளுங்கள்',
            'Ask anything...': 'எதையும் கேளுங்கள்...',
            'Ask anything in Sinhala, English, or Singlish': 'சிங்களம், ஆங்கிலம் அல்லது சிங்லிஷில் எதையும் கேளுங்கள்',
            'Send message': 'செய்தியை அனுப்பவும்',
            'Thinking...': 'சிந்திக்கிறது...',
            'Sign in to use the AI assistant.': 'AI உதவியாளரைப் பயன்படுத்த உள்நுழையவும்.',
            'The AI assistant could not answer right now.': 'AI உதவியாளர் இப்போது பதிலளிக்க முடியவில்லை.',
            'The AI assistant returned an empty response.': 'AI உதவியாளர் வெற்று பதிலை வழங்கியது.',
            'Your session is invalid. Sign in again.': 'உங்கள் அமர்வு செல்லாது. மீண்டும் உள்நுழையவும்.',
            "You have reached today's AI assistant limit. Try again tomorrow.": 'இன்றைய AI உதவியாளர் பயன்பாட்டு வரம்பை அடைந்துவிட்டீர்கள். நாளை மீண்டும் முயற்சிக்கவும்.',
            'The AI assistant is temporarily unavailable. Please try again.': 'AI உதவியாளர் தற்காலிகமாக கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்.',
            'Hi! Ask me anything in Sinhala, English, or Singlish. I can help with CropLink and other questions.': 'வணக்கம்! சிங்களம், ஆங்கிலம் அல்லது சிங்லிஷில் எதையும் கேளுங்கள். CropLink மற்றும் பிற கேள்விகளிலும் உதவுகிறேன்.',
            'Hi! I can help you use CropLink. What would you like to know?': 'வணக்கம்! CropLink பயன்படுத்த உதவுகிறேன். நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?',
            'Ask a question...': 'கேள்வி கேளுங்கள்...',
            'Ask a question': 'கேள்வி கேளுங்கள்',
            'Ask AI': 'AI-யிடம் கேளுங்கள்',
            'How do I add a farmer?': 'விவசாயியை எவ்வாறு சேர்ப்பது?',
            'How are matches calculated?': 'பொருத்தங்கள் எவ்வாறு கணக்கிடப்படுகின்றன?',
            'Open CropLink AI assistant': 'CropLink AI உதவியாளரைத் திறக்கவும்',
            Send: 'அனுப்பு',
            'CropLink support assistant': 'CropLink உதவியாளர்',
            'CropLink Assistant': 'CropLink உதவியாளர்',
            'CropLink AI Chatbot': 'CropLink AI உரையாடல்',
            'Close assistant': 'உதவியாளரை மூடு',
            'Close sign-in': 'உள்நுழைவு சாளரத்தை மூடு',
            'Open profile menu': 'சுயவிவரப் பட்டியைத் திறக்கவும்',
            'View details for': 'விவரங்களைக் காண்க:',
            'Show password': 'கடவுச்சொல்லைக் காட்டு',
            'Hide password': 'கடவுச்சொல்லை மறை',
            'Main navigation': 'முதன்மை வழிசெலுத்தல்',
            'Network overview': 'வலையமைப்பு மேலோட்டம்',
            'Monthly harvest volume trends in kilograms': 'கிலோகிராமில் மாதாந்திர அறுவடை மாற்றங்கள்',
            'Chart.js could not load. Check your internet connection.': 'Chart.js ஏற்றப்படவில்லை. இணைய இணைப்பைச் சரிபார்க்கவும்.',
            'Loading road details from OpenStreetMap...': 'OpenStreetMap-இலிருந்து சாலை விவரங்கள் ஏற்றப்படுகின்றன...',
            'Supplier · ': 'வழங்குநர் · ',
            'Buyer · ': 'வாங்குநர் · ',
            'No open buyer demand.': 'திறந்த வாங்குநர் கோரிக்கைகள் இல்லை.',
            Jan: 'ஜன',
            Feb: 'பிப்',
            Mar: 'மார்',
            Apr: 'ஏப்',
            May: 'மே',
            Jun: 'ஜூன்',
            Jul: 'ஜூலை',
            Aug: 'ஆக',
            Sep: 'செப்',
            Oct: 'அக்',
            Nov: 'நவ',
            Dec: 'டிச'
        }
    };

    const originalText = new WeakMap();
    const renderedText = new WeakMap();
    const originalAttributes = new WeakMap();
    const renderedAttributes = new WeakMap();
    const supportedAttributes = ['aria-label', 'placeholder', 'title'];
    let activeLanguage = 'en';

    function translate(source, language = activeLanguage) {
        if (language === 'en') return source;
        const dictionary = translations[language];
        const trimmed = source.trim();
        if (dictionary[trimmed]) return source.replace(trimmed, dictionary[trimmed]);

        const location = translateLocation(trimmed, language);
        if (location !== trimmed) return source.replace(trimmed, location);
        const supplier = trimmed.match(/^Supplier · (.+)$/);
        if (supplier) return source.replace(trimmed, `${dictionary['Supplier · ']}${translateLocation(supplier[1], language)}`);
        const buyer = trimmed.match(/^Buyer · (.+)$/);
        if (buyer) return source.replace(trimmed, `${dictionary['Buyer · ']}${translateLocation(buyer[1], language)}`);
        const routeLeg = trimmed.match(/^(.+) to (.+)$/);
        if (routeLeg) {
            const from = translateLocation(routeLeg[1], language);
            const to = translateLocation(routeLeg[2], language);
            if (from !== routeLeg[1] && to !== routeLeg[2]) {
                const result = language === 'si' ? `${from} සිට ${to} දක්වා` : `${from} முதல் ${to} வரை`;
                return source.replace(trimmed, result);
            }
        }
        const routeOption = trimmed.match(/^(.+) to (.+) \(([\d,]+) km\)$/);
        if (routeOption) {
            const result = language === 'si'
                ? `${translateLocation(routeOption[1], language)} සිට ${translateLocation(routeOption[2], language)} දක්වා (${routeOption[3]} කි.මී.)`
                : `${translateLocation(routeOption[1], language)} முதல் ${translateLocation(routeOption[2], language)} வரை (${routeOption[3]} கி.மீ.)`;
            return source.replace(trimmed, result);
        }
        const quantityPrice = trimmed.match(/^(.+) \/ (.+) max$/);
        if (quantityPrice) {
            const result = language === 'si'
                ? `${quantityPrice[1]} / ${quantityPrice[2]} උපරිම`
                : `${quantityPrice[1]} / ${quantityPrice[2]} அதிகபட்சம்`;
            return source.replace(trimmed, result);
        }
        const distance = trimmed.match(/^([\d,]+) km$/);
        if (distance) {
            const result = language === 'si' ? `${distance[1]} කි.මී.` : `${distance[1]} கி.மீ.`;
            return source.replace(trimmed, result);
        }
        const showing = trimmed.match(/^Showing ([\d,]+) of ([\d,]+) farmers$/);
        if (showing) {
            const result = language === 'si'
                ? `ගොවීන් ${showing[1]} / ${showing[2]} පෙන්වයි`
                : `விவசாயிகள் ${showing[1]} / ${showing[2]} காட்டப்படுகின்றனர்`;
            return source.replace(trimmed, result);
        }
        const route = trimmed.match(/^Route from (.+) to (.+), ([\d,]+) km, via OpenStreetMap$/);
        if (route) {
            const result = language === 'si'
                ? `${translateLocation(route[1], language)} සිට ${translateLocation(route[2], language)} දක්වා මාර්ගය, කි.මී. ${route[3]}, OpenStreetMap හරහා`
                : `${translateLocation(route[1], language)} முதல் ${translateLocation(route[2], language)} வரை வழித்தடம், ${route[3]} கி.மீ., OpenStreetMap வழியாக`;
            return source.replace(trimmed, result);
        }
        const routeLoading = trimmed.match(/^Loading the road route from (.+) to (.+)\.\.\.$/);
        if (routeLoading) {
            const result = language === 'si'
                ? `${translateLocation(routeLoading[1], language)} සිට ${translateLocation(routeLoading[2], language)} දක්වා මාර්ගය පූරණය කරමින්...`
                : `${translateLocation(routeLoading[1], language)} முதல் ${translateLocation(routeLoading[2], language)} வரையிலான வழித்தடம் ஏற்றப்படுகிறது...`;
            return source.replace(trimmed, result);
        }
        const loadingRoad = trimmed.match(/^We could not load the road route: (.+)$/);
        if (loadingRoad) {
            const prefix = language === 'si' ? 'මාර්ගය පූරණය කළ නොහැකි විය: ' : 'வழித்தடத்தை ஏற்ற முடியவில்லை: ';
            return source.replace(trimmed, prefix + loadingRoad[1]);
        }
        const routeFailed = trimmed.match(/^The road route could not be loaded: (.+)$/);
        if (routeFailed) {
            const prefix = language === 'si' ? 'මාර්ගය පූරණය කළ නොහැකි විය: ' : 'சாலை வழித்தடத்தை ஏற்ற முடியவில்லை: ';
            return source.replace(trimmed, prefix + routeFailed[1]);
        }
        const upTo = trimmed.match(/^Up to ([\d,]+) kg · ([\d,]+) km away · ([\d]+)% suitability$/);
        if (upTo) {
            const result = language === 'si'
                ? `කි.ග්‍රෑ. ${upTo[1]} දක්වා · කි.මී. ${upTo[2]} දුරින් · ගැළපීම ${upTo[3]}%`
                : `${upTo[1]} கி.கி. வரை · ${upTo[2]} கி.மீ. தொலைவில் · பொருத்தம் ${upTo[3]}%`;
            return source.replace(trimmed, result);
        }
        const availableQuantity = trimmed.match(/^([\d,]+) kg available$/);
        if (availableQuantity) {
            const result = language === 'si'
                ? `කි.ග්‍රෑ. ${availableQuantity[1]} ලබාගත හැකිය`
                : `${availableQuantity[1]} கி.கி. கிடைக்கும்`;
            return source.replace(trimmed, result);
        }
        const buyerMatch = trimmed.match(/^to (.+)$/);
        if (buyerMatch) {
            const result = language === 'si' ? `${buyerMatch[1]} වෙත` : `${buyerMatch[1]}க்கு`;
            return source.replace(trimmed, result);
        }
        const detailLabel = trimmed.match(/^View details for (.+)$/);
        if (detailLabel) {
            const result = language === 'si'
                ? `${detailLabel[1]} සඳහා විස්තර බලන්න`
                : `${detailLabel[1]}க்கான விவரங்களைக் காண்க`;
            return source.replace(trimmed, result);
        }
        const soldLabel = trimmed.match(/^Mark ([\d,]+) kg sold from (.+) to (.+)$/);
        if (soldLabel) {
            const result = language === 'si'
                ? `${soldLabel[2]} සිට ${soldLabel[3]} වෙත කි.ග්‍රෑ. ${soldLabel[1]} විකිණූ ලෙස සලකුණු කරන්න`
                : `${soldLabel[2]} இலிருந்து ${soldLabel[3]}க்கு ${soldLabel[1]} கி.கி. விற்றதாகக் குறிக்கவும்`;
            return source.replace(trimmed, result);
        }
        const timeUpdated = trimmed.match(/^Updated (.+)$/);
        if (timeUpdated) {
            const result = language === 'si' ? `යාවත්කාලීන කළේ ${timeUpdated[1]}` : `புதுப்பிக்கப்பட்டது ${timeUpdated[1]}`;
            return source.replace(trimmed, result);
        }
        const allocationProgress = trimmed.match(/^([\d,]+)% of total requested demand$/);
        if (allocationProgress) {
            const result = language === 'si'
                ? `ඉල්ලා ඇති මුළු ඉල්ලුමෙන් ${allocationProgress[1]}%`
                : `மொத்தக் கோரிக்கையில் ${allocationProgress[1]}%`;
            return source.replace(trimmed, result);
        }
        const matchNotifications = trimmed.match(/^([\d,]+) smart matches available$/);
        if (matchNotifications) {
            const result = language === 'si'
                ? `ස්මාර්ට් ගැළපීම් ${matchNotifications[1]}ක් ඇත`
                : `${matchNotifications[1]} சிறந்த பொருத்தங்கள் உள்ளன`;
            return source.replace(trimmed, result);
        }
        const saleConfirmation = trimmed.match(/^Confirm sale of ([\d,]+) kg of (.+) from (.+) to (.+)\? This will reduce both farmer stock and the buyer's remaining request\.$/);
        if (saleConfirmation) {
            const result = language === 'si'
                ? `${saleConfirmation[3]} සිට ${saleConfirmation[4]} වෙත ${saleConfirmation[2]} කි.ග්‍රෑ. ${saleConfirmation[1]} විකිණීම තහවුරු කරන්නද? මෙයින් ගොවි තොගය සහ ගැනුම්කරුගේ ඉතිරි ඉල්ලීම අඩු වේ.`
                : `${saleConfirmation[3]} இலிருந்து ${saleConfirmation[4]}க்கு ${saleConfirmation[2]} ${saleConfirmation[1]} கி.கி. விற்பனையை உறுதிப்படுத்தவா? இதனால் விவசாயியின் இருப்பும் வாங்குநரின் மீதமுள்ள கோரிக்கையும் குறையும்.`;
            return source.replace(trimmed, result);
        }
        const saleRecorded = trimmed.match(/^Sale recorded: ([\d,]+) kg\. Farmer stock and buyer demand have been updated\.$/);
        if (saleRecorded) {
            const result = language === 'si'
                ? `විකිණීම සටහන් කළා: කි.ග්‍රෑ. ${saleRecorded[1]}. ගොවි තොගය සහ ගැනුම්කරු ඉල්ලුම යාවත්කාලීන කර ඇත.`
                : `விற்பனை பதிவு செய்யப்பட்டது: ${saleRecorded[1]} கி.கி. விவசாயியின் இருப்பும் வாங்குநரின் தேவையும் புதுப்பிக்கப்பட்டன.`;
            return source.replace(trimmed, result);
        }
        const errorPrefixes = [
            [/^Sign-in failed: /, 'Sign-in failed:'],
            [/^Account creation failed: /, 'Account creation failed:'],
            [/^Could not save this record: /, 'Could not save this record:'],
            [/^Could not load buyer requests: /, 'Could not load buyer requests:'],
            [/^Could not sign out: /, 'Could not sign out:'],
            [/^Could not switch role: /, 'Could not switch role:'],
            [/^Authentication error: /, 'Authentication error:'],
            [/^Firestore setup failed: /, 'Firestore setup failed:'],
            [/^Existing browser data could not be imported: /, 'Could not save this record:'],
            [/^Could not record this sale: /, 'Could not record this sale:']
        ];
        for (const [pattern, key] of errorPrefixes) {
            const match = trimmed.match(pattern);
            if (match) return source.replace(trimmed, `${dictionary[key] || key} ${trimmed.slice(match[0].length)}`);
        }
        return source;
    }

    function translateLocation(name, language) {
        const locations = {
            Dambulla: ['දඹුල්ල', 'தம்புள்ளை'],
            Anuradhapura: ['අනුරාධපුරය', 'அனுராதபுரம்'],
            Jaffna: ['යාපනය', 'யாழ்ப்பாணம்'],
            Kandy: ['මහනුවර', 'கண்டி'],
            Badulla: ['බදුල්ල', 'பதுளை'],
            Ampara: ['අම්පාර', 'அம்பாறை'],
            Galle: ['ගාල්ල', 'காலி'],
            Kurunegala: ['කුරුණෑගල', 'குருநாகல்'],
            Polonnaruwa: ['පොළොන්නරුව', 'பொலன்னறுவை'],
            Matale: ['මාතලේ', 'மாத்தளை'],
            Colombo: ['කොළඹ', 'கொழும்பு'],
            Negombo: ['මීගමුව', 'நீர்கொழும்பு'],
            'Nuwara Eliya': ['නුවරඑළිය', 'நுவரெலியா'],
            Ratnapura: ['රත්නපුර', 'இரத்தினபுரி']
        };
        const names = locations[name];
        return names ? names[language === 'si' ? 0 : 1] : name;
    }

    function localizeTextNode(node) {
        const current = node.nodeValue;
        const previousRender = renderedText.get(node);
        if (!originalText.has(node) || current !== previousRender) originalText.set(node, current);
        const source = originalText.get(node);
        const localized = translate(source);
        if (current !== localized) node.nodeValue = localized;
        renderedText.set(node, localized);
    }

    function getAttributeMap(map, element) {
        let values = map.get(element);
        if (!values) {
            values = new Map();
            map.set(element, values);
        }
        return values;
    }

    function localizeAttribute(element, attribute) {
        const current = element.getAttribute(attribute);
        if (current === null) return;
        const originals = getAttributeMap(originalAttributes, element);
        const rendered = getAttributeMap(renderedAttributes, element);
        if (!originals.has(attribute) || current !== rendered.get(attribute)) originals.set(attribute, current);
        const localized = translate(originals.get(attribute));
        if (current !== localized) element.setAttribute(attribute, localized);
        rendered.set(attribute, localized);
    }

    function localizeNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            localizeTextNode(node);
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) localizeTextNode(walker.currentNode);
        supportedAttributes.forEach(attribute => localizeAttribute(node, attribute));
        node.querySelectorAll('*').forEach(element => {
            supportedAttributes.forEach(attribute => localizeAttribute(element, attribute));
        });
    }

    function setLanguage(language) {
        if (!['en', 'si', 'ta'].includes(language)) language = 'en';
        activeLanguage = language;
        document.documentElement.lang = language;
        document.querySelectorAll('.language-selector').forEach(select => {
            select.value = language;
        });
        localizeNode(document.documentElement);
        localStorage.setItem(languageStorageKey, language);
        window.dispatchEvent(new CustomEvent('croplink:languagechange', { detail: { language } }));
    }

    function addLanguageSelectors() {
        document.querySelectorAll('.topbar-actions').forEach(actions => {
            if (actions.querySelector('.language-selector')) return;
            const label = document.createElement('label');
            label.className = 'language-picker';
            label.innerHTML = '<span class="sr-only">Language</span><select class="language-selector" aria-label="Choose language"><option value="en">English</option><option value="si">සිංහල</option><option value="ta">தமிழ்</option></select>';
            label.querySelector('select').addEventListener('change', event => setLanguage(event.target.value));
            actions.prepend(label);
        });
    }

    function initialize() {
        activeLanguage = localStorage.getItem(languageStorageKey) || 'en';
        addLanguageSelectors();
        const observer = new MutationObserver(records => {
            records.forEach(record => {
                if (record.type === 'characterData') {
                    localizeTextNode(record.target);
                    return;
                }
                record.addedNodes.forEach(localizeNode);
                if (record.type === 'attributes' && supportedAttributes.includes(record.attributeName)) {
                    localizeAttribute(record.target, record.attributeName);
                }
            });
        });
        observer.observe(document.documentElement, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: supportedAttributes
        });
        setLanguage(activeLanguage);
    }

    window.CropLinkI18n = {
        get language() { return activeLanguage; },
        get locale() { return languageLocales[activeLanguage]; },
        translate
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
})();
