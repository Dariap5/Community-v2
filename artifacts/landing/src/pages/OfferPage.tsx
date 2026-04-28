import React from 'react';

export default function OfferPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-3xl mx-auto px-5 md:px-12 py-16 md:py-24">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Вернуться на главную
        </a>

        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
          Публичная оферта
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-sm text-muted-foreground/60">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">1. Предмет оферты</h2>
            <p>
              Настоящая Публичная оферта (далее — Оферта) является предложением Оператора оказать услуги по предоставлению доступа к закрытому сообществу (комьюнити) через Telegram-бота.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">2. Условия подписки</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Ежемесячная подписка: 2 800 ₽/месяц</li>
              <li>Квартальная подписка: 7 500 ₽ (≈ 2 500 ₽/месяц)</li>
              <li>Оплата производится через Telegram-бота после короткого знакомства</li>
              <li>Право на отказ от подписки в течение первой недели без вопросов</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">3. Включённые услуги</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Доступ к закрытому чату сообщества</li>
              <li>Еженедельные групповые созвоны (до 8 человек)</li>
              <li>Личный buddy (наставник для еженедельных встреч)</li>
              <li>Доступ ко всем темам: Карьера, Бизнес, Нейросети</li>
              <li>Поддержка и консультации от членов сообщества</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">4. Гарантия возврата</h2>
            <p>
              Если вы в течение первой недели (7 дней) использования решите, что услуга не соответствует вашим ожиданиям, мы вернём 100% платежа без дополнительных вопросов.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">5. Ограничения и условия</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Набор ограничен 40 участниками</li>
              <li>После заполнения квоты доступ будет закрыт для новых членов</li>
              <li>Участники должны быть взрослыми и готовыми к активному взаимодействию</li>
              <li>Запрещены спам, реклама и нарушение конфиденциальности других членов</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">6. Отмена подписки</h2>
            <p>
              Вы можете отменить подписку в любой момент. Платежи будут прекращены со следующего биллингового цикла. Промежуточные дни не возвращаются.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">7. Изменение условий</h2>
            <p>
              Оператор оставляет право на изменение условий Оферты с предварительным уведомлением участников не менее чем за 7 дней.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">8. Контакты</h2>
            <p>
              По всем вопросам об Оферте напишите нам в Telegram: <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@community_support</a>
            </p>
          </section>

          <div className="border-t border-border/30 pt-8 mt-12">
            <p className="text-sm text-muted-foreground/60">
              © {new Date().getFullYear()} Закрытое комьюнити. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
