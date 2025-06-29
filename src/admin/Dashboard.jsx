import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = ({ onLogout }) => {
  const { language, t, updateTranslations } = useLanguage();

  const [contactPhone, setContactPhone] = useState(t.footer.contactPhone);
  const [contactEmail, setContactEmail] = useState(t.footer.contactEmail);
  const [contactAddress, setContactAddress] = useState(t.footer.contactAddress);

  const [services, setServices] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      title: t.services[`service${i + 1}Title`] || '',
      text: t.services[`service${i + 1}Text`] || '',
      image: t.services[`service${i + 1}Image`] || '',
    }))
  );

  const [projects, setProjects] = useState(
    Array.from({ length: 4 }, (_, i) => ({
      title: t.projects[`project${i + 1}Title`] || '',
      text: t.projects[`project${i + 1}Text`] || '',
      image: t.projects[`project${i + 1}Image`] || '',
    }))
  );

  const handleServiceChange = (index, field, value) => {
    setServices((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleProjectChange = (index, field, value) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = () => {
    const serviceUpdates = {};
    services.forEach((s, idx) => {
      serviceUpdates[`service${idx + 1}Title`] = s.title;
      serviceUpdates[`service${idx + 1}Text`] = s.text;
      serviceUpdates[`service${idx + 1}Image`] = s.image;
    });
    const projectUpdates = {};
    projects.forEach((p, idx) => {
      projectUpdates[`project${idx + 1}Title`] = p.title;
      projectUpdates[`project${idx + 1}Text`] = p.text;
      projectUpdates[`project${idx + 1}Image`] = p.image;
    });

    updateTranslations(language, {
      services: serviceUpdates,
      projects: projectUpdates,
      footer: {
        contactPhone,
        contactEmail,
        contactAddress,
      },
      contact: {
        addressValue: contactAddress,
      },
    });
    alert('Saved');
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Company Info</h2>
        <input
          className="border p-2 w-full"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="Phone"
        />
        <input
          className="border p-2 w-full"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="border p-2 w-full"
          value={contactAddress}
          onChange={(e) => setContactAddress(e.target.value)}
          placeholder="Address"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Services</h2>
        {services.map((service, idx) => (
          <div key={idx} className="border p-4 rounded space-y-2">
            <input
              className="border p-2 w-full"
              value={service.title}
              onChange={(e) =>
                handleServiceChange(idx, 'title', e.target.value)
              }
              placeholder={`Service ${idx + 1} Title`}
            />
            <textarea
              className="border p-2 w-full"
              value={service.text}
              onChange={(e) =>
                handleServiceChange(idx, 'text', e.target.value)
              }
              placeholder={`Service ${idx + 1} Description`}
            />
            <input
              className="border p-2 w-full"
              value={service.image}
              onChange={(e) =>
                handleServiceChange(idx, 'image', e.target.value)
              }
              placeholder={`Service ${idx + 1} Image URL`}
            />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        {projects.map((project, idx) => (
          <div key={idx} className="border p-4 rounded space-y-2">
            <input
              className="border p-2 w-full"
              value={project.title}
              onChange={(e) =>
                handleProjectChange(idx, 'title', e.target.value)
              }
              placeholder={`Project ${idx + 1} Title`}
            />
            <textarea
              className="border p-2 w-full"
              value={project.text}
              onChange={(e) =>
                handleProjectChange(idx, 'text', e.target.value)
              }
              placeholder={`Project ${idx + 1} Description`}
            />
            <input
              className="border p-2 w-full"
              value={project.image}
              onChange={(e) =>
                handleProjectChange(idx, 'image', e.target.value)
              }
              placeholder={`Project ${idx + 1} Image URL`}
            />
          </div>
        ))}
      </section>

      <button
        onClick={handleSave}
        className="bg-[#b18344] text-white px-6 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default Dashboard;
