// MainScreen.jsx
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PollCard from '../components/PollCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { fetchPolls, createPoll } from '../utils/api.js';
import { useContext } from 'react';
import { UserContext } from '../App.jsx';
import NewPollModal from '../components/NewPollModal.jsx';
import '../styles/mainScreen.css';
export default function MainScreen() {
const { telegramId } = useContext(UserContext);
const [polls, setPolls] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [showNewPollModal, setShowNewPollModal] = useState(false);
const sentinel = useRef(null);
// Сохранение скролла при скролле и уходе
const saveScroll = () => {
localStorage.setItem('mainScreenScroll', window.scrollY);
};
useEffect(() => {
window.addEventListener('scroll', saveScroll);
window.addEventListener('beforeunload', saveScroll);
return () => {
window.removeEventListener('scroll', saveScroll);
window.removeEventListener('beforeunload', saveScroll);
saveScroll();
};
}, []);
// Восстановление скролла синхронно (useLayoutEffect — до paint)
useLayoutEffect(() => {
const savedScroll = localStorage.getItem('mainScreenScroll');
if (savedScroll) {
window.scrollTo(0, parseInt(savedScroll, 10));
}
}, [polls]);
const loadPolls = async (pageNum = 1, append = false) => {
setLoading(true);
try {
const data = await fetchPolls(pageNum);
if (append) {
setPolls(prev => [...prev, ...data]);
} else {
setPolls(data);
}
setHasMore(data.length === 20);
} catch (e) {
setError('Не удалось загрузить опросы');
} finally {
setLoading(false);
}
};
useEffect(() => {
loadPolls(1, false);
}, []);
useEffect(() => {
if (page > 1) loadPolls(page, true);
}, [page]);
useEffect(() => {
if (!sentinel.current || loading || !hasMore) return;
const observer = new IntersectionObserver(
entries => {
if (entries[0].isIntersecting) {
setPage(prev => prev + 1);
}
},
{ rootMargin: '200px' }
);
observer.observe(sentinel.current);
return () => observer.disconnect();
}, [loading, hasMore, sentinel.current]);
const handleOpenNewPoll = () => {
setShowNewPollModal(true);
};
const handleSaveNewPoll = async ({ title, question, options }) => {
try {
await createPoll({ title, question, options, telegramId });
alert('Опрос успешно создан как черновик!\nОжидайте одобрения и публикации.');
loadPolls(1, false);
} catch (e) {
alert('Ошибка создания опроса');
}
setShowNewPollModal(false);
};
if (loading && polls.length === 0) return <LoadingSpinner />;
if (error) return <p style={{ color: 'red' }}>{error};
return (
    
      
        Опросы
        <button class="new-poll-btn" onclick="{handleOpenNewPoll}">
          + Новый
        </button>
      
{showNewPollModal && (
<NewPollModal
onClose={() => setShowNewPollModal(false)}
onSave={handleSaveNewPoll}
/>
)}
      
        {polls.map(poll => <pollcard poll="{poll}">)}
        {hasMore &#x26;&#x26; <div 100="" style="{{" height:="" }}="">}
        {loading &#x26;&#x26; polls.length > 0 &#x26;&#x26; <p>Загрузка...</p>}
      </div></pollcard>
    
  );
}