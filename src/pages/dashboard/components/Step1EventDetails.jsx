import React, { useRef, useState } from "react";
import { FiUploadCloud, FiMapPin } from "react-icons/fi";
import { useSelector } from "react-redux";

const Step1EventDetails = ({ formData, setFormData, onNext, onSaveDraft }) => {
  const fileInputRef = useRef(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Mock data for states and LGAs
  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];

  const user = useSelector((state) => state.user?.user);
  const fullName = user?.fullname || "User";
  const FirstName = fullName.split(" ")[0];

  // Mock event categories
  const eventCategories = [
    "Conference",
    "Workshop",
    "Seminar",
    "Networking",
    "Social Gathering",
    "Fundraiser",
    "Concert",
    "Festival",
    "Sports",
    "Webinar",
    "Exhibition",
    "Other",
  ];

  // Mock LGAs based on selected state
  const getLGAs = (state) => {
    const lgaMap = {
      FCT: [
        "Abuja Municipal Area Council (AMAC)",
        "Abaji",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali",
      ],
      Abia: [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikwuano",
        "Isiala Ngwa North",
        "Isiala Ngwa South",
        "Isuikwuato",
        "Obi Ngwa",
        "Ohafia",
        "Osisioma Ngwa",
        "Ugwunagbo",
        "Ukwa East",
        "Ukwa West",
        "Umuahia North",
        "Umuahia South",
        "Umu Nneochi",
      ],
      Adamawa: [
        "Demsa",
        "Fufure",
        "Ganye",
        "Gayuk",
        "Girei",
        "Gombi",
        "Guyuk",
        "Hong",
        "Jada",
        "Lamurde",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South",
      ],
      "Akwa Ibom": [
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono-Ibom",
        "Ika",
        "Ikono",
        "Ikot Abasi",
        "Ikot Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat-Enin",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung-Uko",
        "Ukanafun",
        "Uruan",
        "Urue-Offong/Oruko",
        "Uyo",
      ],
      Anambra: [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili South",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi",
      ],
      Bauchi: [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas/Gadau",
        "Jama'are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa Balewa",
        "Toro",
        "Warji",
        "Zaki",
      ],
      Bayelsa: [
        "Brass",
        "Ekeremor",
        "Kolokuma/Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern Ijaw",
        "Yenagoa",
      ],
      Benue: [
        "Ado",
        "Agatu",
        "Apa",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer East",
        "Gwer West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Obi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Oturkpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya",
      ],
      Borno: [
        "Abadam",
        "Askira/Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala/Balge",
        "Konduga",
        "Kukawa",
        "Kwaya Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani",
      ],
      "Cross River": [
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar Municipal",
        "Calabar South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakuur",
        "Yala",
      ],
      Delta: [
        "Aniocha North",
        "Aniocha South",
        "Bomadi",
        "Burutu",
        "Ethiope East",
        "Ethiope West",
        "Ika North East",
        "Ika South",
        "Isoko North",
        "Isoko South",
        "Ndokwa East",
        "Ndokwa West",
        "Okpe",
        "Oshimili North",
        "Oshimili South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli North",
        "Ughelli South",
        "Ukwuani",
        "Uvwie",
        "Warri North",
        "Warri South",
        "Warri South West",
      ],
      Ebonyi: [
        "Abakaliki",
        "Afikpo North",
        "Afikpo South",
        "Ebonyi",
        "Ezza North",
        "Ezza South",
        "Ikwo",
        "Ishielu",
        "Ivo",
        "Izzi",
        "Ohaozara",
        "Ohaukwu",
        "Onicha",
      ],
      Edo: [
        "Akoko-Edo",
        "Egor",
        "Esan Central",
        "Esan North-East",
        "Esan South-East",
        "Esan West",
        "Etsako Central",
        "Etsako East",
        "Etsako West",
        "Igueben",
        "Ikpoba Okha",
        "Oredo",
        "Orhionmwon",
        "Ovia North-East",
        "Ovia South-West",
        "Owan East",
        "Owan West",
        "Uhunmwonde",
      ],
      Ekiti: [
        "Ado Ekiti",
        "Aiyekire",
        "Efon",
        "Ekiti East",
        "Ekiti South-West",
        "Ekiti West",
        "Emure",
        "Ido Osi",
        "Ijero",
        "Ikere",
        "Ikole",
        "Ilejemeje",
        "Irepodun/Ifelodun",
        "Ise/Orun",
        "Moba",
        "Oye",
      ],
      Enugu: [
        "Aninri",
        "Awgu",
        "Enugu East",
        "Enugu North",
        "Enugu South",
        "Ezeagu",
        "Igbo Etiti",
        "Igbo Eze North",
        "Igbo Eze South",
        "Isi Uzo",
        "Nkanu East",
        "Nkanu West",
        "Nsukka",
        "Oji River",
        "Udenu",
        "Udi",
        "Uzo-Uwani",
      ],
      Gombe: [
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu/Deba",
      ],
      Imo: [
        "Aboh Mbaise",
        "Ahiazu Mbaise",
        "Ehime Mbano",
        "Ezinihitte",
        "Ideato North",
        "Ideato South",
        "Ihitte/Uboma",
        "Ikeduru",
        "Isiala Mbano",
        "Isu",
        "Mbaitoli",
        "Ngor Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji/Egbema",
        "Okigwe",
        "Onuimo",
        "Orlu",
        "Orsu",
        "Oru East",
        "Oru West",
        "Owerri Municipal",
        "Owerri North",
        "Owerri West",
        "Unuimo",
      ],
      Jigawa: [
        "Auyo",
        "Babura",
        "Biriniwa",
        "Birnin Kudu",
        "Buji",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin Hausa",
        "Kaugama",
        "Kazaure",
        "Kiri Kasama",
        "Kiyawa",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Ringim",
        "Roni",
        "Sule Tankarkar",
        "Taura",
        "Yankwashi",
      ],
      Kaduna: [
        "Birnin Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema'a",
        "Kachia",
        "Kaduna North",
        "Kaduna South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon Gari",
        "Sanga",
        "Soba",
        "Zangon Kataf",
        "Zaria",
      ],
      Kano: [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin Kudu",
        "Dawakin Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun Mallam",
        "Gaya",
        "Gezawa",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin Gado",
        "Rogo",
        "Shanono",
        "Sumaila",
        "Takai",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun Wada",
        "Ungogo",
        "Warawa",
        "Wudil",
      ],
      Katsina: [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Dandume",
        "Danja",
        "Dan Musa",
        "Daura",
        "Dutsi",
        "Dutsin Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai'Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango",
      ],
      Kebbi: [
        "Aleiro",
        "Arewa Dandi",
        "Argungu",
        "Augie",
        "Bagudo",
        "Birnin Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko/Besse",
        "Maiyama",
        "Ngaski",
        "Sakaba",
        "Shanga",
        "Suru",
        "Wasagu/Danko",
        "Yauri",
        "Zuru",
      ],
      Kogi: [
        "Adavi",
        "Ajaokuta",
        "Ankpa",
        "Bassa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela Odolu",
        "Ijumu",
        "Kabba/Bunu",
        "Kogi",
        "Lokoja",
        "Mopa-Muro",
        "Ofu",
        "Ogori/Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Yagba East",
        "Yagba West",
      ],
      Kwara: [
        "Asa",
        "Baruten",
        "Edu",
        "Ekiti",
        "Ifelodun",
        "Ilorin East",
        "Ilorin South",
        "Ilorin West",
        "Irepodun",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke Ero",
        "Oyun",
        "Pategi",
      ],
      Lagos: [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos Island",
        "Lagos Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere",
      ],
      Nasarawa: [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Kokona",
        "Lafia",
        "Nasarawa",
        "Nasarawa Egon",
        "Obi",
        "Toto",
        "Wamba",
      ],
      Niger: [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Magama",
        "Mariga",
        "Mashegu",
        "Mokwa",
        "Munya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi",
      ],
      Ogun: [
        "Abeokuta North",
        "Abeokuta South",
        "Ado-Odo/Ota",
        "Egbado North",
        "Egbado South",
        "Ewekoro",
        "Ifo",
        "Ijebu East",
        "Ijebu North",
        "Ijebu North East",
        "Ijebu Ode",
        "Ikenne",
        "Imeko Afon",
        "Ipokia",
        "Obafemi Owode",
        "Odeda",
        "Odogbolu",
        "Ogun Waterside",
        "Remo North",
        "Shagamu",
        "Yewa North",
        "Yewa South",
      ],
      Ondo: [
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-East",
        "Akoko South-West",
        "Akure North",
        "Akure South",
        "Ese Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile Oluji/Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo East",
        "Ondo West",
        "Ose",
        "Owo",
      ],
      Osun: [
        "Atakunmosa East",
        "Atakunmosa West",
        "Aiyedaade",
        "Aiyedire",
        "Boluwaduro",
        "Boripe",
        "Ede North",
        "Ede South",
        "Ife Central",
        "Ife East",
        "Ife North",
        "Ife South",
        "Egbedore",
        "Ejigbo",
        "Ifedayo",
        "Ifelodun",
        "Ila",
        "Ilesa East",
        "Ilesa West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo",
      ],
      Oyo: [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Ibarapa Central",
        "Ibarapa East",
        "Ibarapa North",
        "Ido",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogbomosho North",
        "Ogbomosho South",
        "Ogo Oluwa",
        "Olorunsogo",
        "Oluyole",
        "Ona Ara",
        "Orelope",
        "Ori Ire",
        "Oyo East",
        "Oyo West",
        "Saki East",
        "Saki West",
        "Surulere",
      ],
      Plateau: [
        "Barkin Ladi",
        "Bassa",
        "Bokkos",
        "Jos East",
        "Jos North",
        "Jos South",
        "Kanam",
        "Kanke",
        "Langtang North",
        "Langtang South",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua'an Pan",
        "Riyom",
        "Shendam",
        "Wase",
      ],
      Rivers: [
        "Abua/Odual",
        "Ahoada East",
        "Ahoada West",
        "Akuku-Toru",
        "Andoni",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Eleme",
        "Emuoha",
        "Etche",
        "Gokana",
        "Ikwerre",
        "Khana",
        "Obio/Akpor",
        "Ogba/Egbema/Ndoni",
        "Ogu/Bolo",
        "Okrika",
        "Omuma",
        "Opobo/Nkoro",
        "Oyigbo",
        "Port Harcourt",
        "Tai",
      ],
      Sokoto: [
        "Binji",
        "Bodinga",
        "Dange Shuni",
        "Gada",
        "Goronyo",
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Isa",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto North",
        "Sokoto South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo",
      ],
      Taraba: [
        "Ardo Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim Lamido",
        "Kumi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing",
      ],
      Yobe: [
        "Bade",
        "Bursari",
        "Damaturu",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari",
      ],
      Zamfara: [
        "Anka",
        "Bakura",
        "Birnin Magaji/Kiyaw",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Kaura Namoda",
        "Maradun",
        "Maru",
        "Shinkafi",
        "Talata Mafara",
        "Tsafe",
        "Zurmi",
      ],
    };
    return lgaMap[state] || [];
  };

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        if (!value || value.trim() === "") return "Event title is required";
        if (value.length < 3)
          return "Event title must be at least 3 characters";
        return "";

      case "category":
        if (!value || value.trim() === "") return "Event category is required";
        return "";

      case "location":
        if (!value || value.trim() === "") return "Event location is required";
        return "";

      case "date":
        if (!value) return "Event date is required";
        return "";

      case "startTime":
        if (!value) return "Start time is required";
        return "";

      case "endTime":
        if (!value) return "End time is required";
        return "";

      case "description":
        if (!value || value.trim() === "")
          return "Event description is required";
        if (value.length < 20)
          return "Description must be at least 20 characters";
        return "";

      case "coverImage":
        if (!value) return "Event cover image is required";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    newErrors.title = validateField("title", formData.title);
    newErrors.category = validateField("category", formData.category);
    newErrors.location = validateField("location", formData.location);
    newErrors.date = validateField("date", formData.date);
    newErrors.startTime = validateField("startTime", formData.startTime);
    newErrors.endTime = validateField("endTime", formData.endTime);
    newErrors.description = validateField("description", formData.description);
    newErrors.coverImage = validateField("coverImage", formData.coverImage);

    // Check if end time is after start time
    if (formData.startTime && formData.endTime) {
      if (formData.endTime <= formData.startTime) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    setErrors(newErrors);

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      if (
        [
          "title",
          "category",
          "location",
          "date",
          "startTime",
          "endTime",
          "description",
          "coverImage",
        ].includes(key)
      ) {
        allTouched[key] = true;
      }
    });
    setTouched(allTouched);

    // Return true if no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleLocationSelect = () => {
    // Format the full location string
    const fullLocation = `${formData.street}, ${formData.lga}, ${formData.state}, ${formData.country}`;
    setFormData((prev) => ({
      ...prev,
      location: fullLocation,
    }));
    setIsLocationModalOpen(false);

    // Validate location after setting
    const error = validateField("location", fullLocation);
    setErrors((prev) => ({ ...prev, location: error }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5mb");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        // Update formData with both preview and file
        setFormData((prev) => ({
          ...prev,
          coverImage: event.target.result, // For preview
          coverImageFile: file, // For FormData upload
        }));

        // Validate image after upload
        const error = validateField("coverImage", event.target.result);
        setErrors((prev) => ({ ...prev, coverImage: error }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload({ target: { files } });
    }
  };

  const handleSocialLinkChange = (e, index) => {
    const { value } = e.target;
    const newSocialLinks = [...(formData.socialLinks || [])];
    newSocialLinks[index] = value;
    setFormData((prev) => ({
      ...prev,
      socialLinks: newSocialLinks,
    }));
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    } else {
      // Scroll to first error
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Greeting */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Hello {FirstName},
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Start setting up your event
        </p>
      </div>

      {/* Event Details Section */}
      <div className="bg-white">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          Event Details
        </h2>

        {/* Two Column Layout - Stack on mobile, side by side on tablet/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Event Title */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="enter event title"
              value={formData.title || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.title && errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.title && errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Event Location */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Event Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="location"
                placeholder="click to set location"
                value={formData.location || ""}
                readOnly
                onClick={() => setIsLocationModalOpen(true)}
                onBlur={handleBlur}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer bg-gray-50 ${
                  touched.location && errors.location
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <FiMapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            {touched.location && errors.location && (
              <p className="mt-1 text-xs text-red-500">{errors.location}</p>
            )}
          </div>
        </div>

        {/* Event Date and Category - Two Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Event Date */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.date && errors.date
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.date && errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          {/* Event Category */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Event Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.category && errors.category
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {eventCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {touched.category && errors.category && (
              <p className="mt-1 text-xs text-red-500">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Start Time and End Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Start Time */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.startTime && errors.startTime
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.startTime && errors.startTime && (
              <p className="mt-1 text-xs text-red-500">{errors.startTime}</p>
            )}
          </div>

          {/* End Time */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.endTime && errors.endTime
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.endTime && errors.endTime && (
              <p className="mt-1 text-xs text-red-500">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Event Description */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Event Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="clearly and briefly describe your event"
            value={formData.description || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            rows="5"
            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
              touched.description && errors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {touched.description && errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Minimum 20 characters</p>
        </div>

        {/* Event Cover Image */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Event Cover Image <span className="text-red-500">*</span>
          </label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
            className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer hover:border-gray-400 transition-colors ${
              touched.coverImage && errors.coverImage
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
          >
            {formData.coverImage ? (
              <div className="space-y-3 sm:space-y-4">
                <img
                  src={formData.coverImage}
                  alt="Event cover"
                  className="w-full h-24 sm:h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm sm:text-base text-indigo-600 font-medium hover:text-indigo-700"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <FiUploadCloud className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-gray-400" />
                <p className="text-sm sm:text-base text-gray-600">
                  Drag & drop image here
                </p>
                <p className="text-xs sm:text-sm text-gray-500">OR</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm sm:text-base text-indigo-600 font-medium hover:text-indigo-700"
                >
                  Upload Image
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {touched.coverImage && errors.coverImage && (
            <p className="mt-1 text-xs text-red-500">{errors.coverImage}</p>
          )}
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Image size should be less than 5mb
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-medium text-gray-700">
            Add Social Links (Optional)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {["Facebook", "LinkedIn", "Twitter/X", "Instagram"].map(
              (platform, index) => (
                <div key={index}>
                  <label className="block text-xs text-gray-600 mb-1">
                    {platform}
                  </label>
                  <input
                    type="url"
                    placeholder={`enter ${platform.toLowerCase()} profile link`}
                    value={formData.socialLinks?.[index] || ""}
                    onChange={(e) => handleSocialLinkChange(e, index)}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
        <button
          onClick={onSaveDraft}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Save Draft
        </button>
        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 sm:px-8 py-2 bg-indigo-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-indigo-950 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Location Modal - Responsive */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              Set Event Location
            </h3>

            {/* Country */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleInputChange}
                placeholder="Enter country"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* State */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                State
              </label>
              <select
                name="state"
                value={formData.state || ""}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* LGA */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Local Government Area
              </label>
              <select
                name="lga"
                value={formData.lga || ""}
                onChange={handleInputChange}
                disabled={!formData.state}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select LGA</option>
                {formData.state &&
                  getLGAs(formData.state).map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
              </select>
            </div>

            {/* Street */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.street || ""}
                onChange={handleInputChange}
                placeholder="Enter street address"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 font-medium hover:bg-gray-50 transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleLocationSelect}
                disabled={
                  !formData.country ||
                  !formData.state ||
                  !formData.lga ||
                  !formData.street
                }
                className="w-full sm:flex-1 px-4 py-2 bg-indigo-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-indigo-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                Set Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1EventDetails;
